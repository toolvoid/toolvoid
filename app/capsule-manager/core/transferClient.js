const http = require('http')
const WebSocket = require('ws')
const { launchBrowser } = require('./browserLauncher')

const CDP_HOST = '127.0.0.1'
const CDP_PORT = 9222
const activeSockets = new Set()
const activeTimers = new Set()
let shuttingDown = false

function delay(ms) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      activeTimers.delete(timer)
      resolve()
    }, ms)
    activeTimers.add(timer)
  })
}

function cdpRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: CDP_HOST, port: CDP_PORT, path, method }, res => {
      let body = ''
      res.on('data', chunk => { body += chunk })
      res.on('end', () => {
        try { resolve(JSON.parse(body)) }
        catch { resolve(body) }
      })
    })
    req.on('error', reject)
    req.end()
  })
}

async function ensureBrowser(url) {
  try {
    await cdpRequest('/json/version')
  } catch {
    await launchBrowser(null, url)
  }
}

function send(ws, id, method, params = {}) {
  ws.send(JSON.stringify({ id, method, params }))
}

function waitForResponse(ws, id, timeout = 35000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('Timed out while talking to browser'))
    }, timeout)
    activeTimers.add(timer)

    function cleanup() {
      clearTimeout(timer)
      activeTimers.delete(timer)
      ws.off('message', onMessage)
      ws.off('close', onClose)
      ws.off('error', onError)
    }

    function onMessage(data) {
      const msg = JSON.parse(data.toString())
      if (msg.id === id) {
        cleanup()
        resolve(msg.result || {})
      }
    }

    function onClose() {
      cleanup()
      if (shuttingDown) resolve({})
      else reject(new Error('Browser connection closed'))
    }

    function onError(err) {
      cleanup()
      if (shuttingDown) resolve({})
      else reject(err)
    }

    ws.on('message', onMessage)
    ws.once('close', onClose)
    ws.once('error', onError)
  })
}

async function evaluate(ws, expression, idRef) {
  const id = idRef.next++
  send(ws, id, 'Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  })
  return waitForResponse(ws, id)
}

function fillScript(prompt) {
  return `
    (async function() {
      const prompt = ${JSON.stringify(prompt)};
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      if (window.__capsuleManagerLastPrompt === prompt) {
        return { success: true, alreadyFilled: true };
      }

      const selectors = [
        '.ProseMirror[contenteditable="true"]',
        '[role="textbox"][contenteditable="true"]',
        '[data-testid="chat-input"]',
        '[data-testid="prompt-textarea"]',
        'div[contenteditable="true"][enterkeyhint]',
        'div[contenteditable="true"]',
        'textarea',
        'p[contenteditable="true"]'
      ];

      function isVisible(el) {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return rect.width > 20 && rect.height > 16 && style.visibility !== 'hidden' && style.display !== 'none';
      }

      function findInput() {
        const candidates = selectors
          .flatMap(selector => Array.from(document.querySelectorAll(selector)))
          .filter((el, index, arr) => arr.indexOf(el) === index)
          .filter(el => isVisible(el) && !el.disabled && !el.readOnly);

        const preferred = candidates.find(el => {
          const text = [
            el.getAttribute('aria-label'),
            el.getAttribute('placeholder'),
            el.getAttribute('data-placeholder'),
            el.className
          ].join(' ').toLowerCase();
          return /message|prompt|ask|claude|chat|reply/.test(text);
        });

        return preferred || candidates[candidates.length - 1] || null;
      }

      function setTextareaValue(input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        if (setter) setter.call(input, prompt);
        else input.value = prompt;
        input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: prompt }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }

      function setEditableValue(input) {
        input.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(input);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('delete', false, null);
        document.execCommand('insertText', false, prompt);
        input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: prompt }));
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: ' ' }));
      }

      for (let i = 0; i < 120; i++) {
        const input = findInput();
        if (input) {
          if (input.tagName === 'TEXTAREA') setTextareaValue(input);
          else setEditableValue(input);
          window.__capsuleManagerLastPrompt = prompt;
          return { success: true };
        }
        await sleep(250);
      }

      return { success: false, error: 'Chat input not found. Log in first, then try Open + Fill again.' };
    })()
  `
}

async function transferCapsule(url, prompt) {
  if (shuttingDown) throw new Error('App is shutting down')
  await ensureBrowser(url)
  const tab = await cdpRequest(`/json/new?${encodeURIComponent(url)}`, 'PUT')
  await cdpRequest(`/json/activate/${tab.id}`)
  const ws = new WebSocket(tab.webSocketDebuggerUrl)
  activeSockets.add(ws)
  const idRef = { next: 1 }

  await new Promise((resolve, reject) => {
    ws.once('open', resolve)
    ws.once('error', reject)
  })

  try {
    await delay(1500)
    let result = await evaluate(ws, fillScript(prompt), idRef)
    if (result.exceptionDetails) {
      await delay(1500)
      result = await evaluate(ws, fillScript(prompt), idRef)
    }
    const value = result.result?.value
    if (value && value.success === false) throw new Error(value.error)
    if (result.exceptionDetails) throw new Error('Could not fill the capsule into this page. Try after the chat box is visible.')
  } finally {
    activeSockets.delete(ws)
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close()
  }

  return { success: true }
}

function shutdownTransferClient() {
  shuttingDown = true
  for (const timer of activeTimers) clearTimeout(timer)
  activeTimers.clear()
  for (const ws of activeSockets) {
    try {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close()
    } catch {}
  }
  activeSockets.clear()
}

module.exports = { transferCapsule, shutdownTransferClient }
