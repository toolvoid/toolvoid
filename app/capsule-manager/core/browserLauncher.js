const { spawn } = require('child_process')
const fs = require('fs')
const net = require('net')
const os = require('os')
const path = require('path')

const DEBUG_PORT = 9222
const PROFILE_DIR = path.join(os.homedir(), '.capsule-manager-browser-profile')
const LINUX_BROWSERS = [
  { id: 'brave', name: 'Brave', paths: ['/usr/bin/brave-browser', '/usr/bin/brave'] },
  { id: 'chrome', name: 'Google Chrome', paths: ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable'] },
  { id: 'chromium', name: 'Chromium', paths: ['/usr/bin/chromium-browser', '/usr/bin/chromium'] },
  { id: 'edge', name: 'Microsoft Edge', paths: ['/usr/bin/microsoft-edge', '/usr/bin/microsoft-edge-stable'] },
  { id: 'vivaldi', name: 'Vivaldi', paths: ['/usr/bin/vivaldi', '/usr/bin/vivaldi-stable'] },
]
const WINDOWS_BROWSERS = [
  { id: 'chrome', name: 'Google Chrome', paths: ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'] },
  { id: 'chrome-x86', name: 'Google Chrome (x86)', paths: ['C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'] },
  { id: 'edge', name: 'Microsoft Edge', paths: ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'] },
  { id: 'brave', name: 'Brave', paths: ['C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'] },
]
const MACOS_BROWSERS = [
  { id: 'chrome', name: 'Google Chrome', paths: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'] },
  { id: 'edge', name: 'Microsoft Edge', paths: ['/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'] },
  { id: 'brave', name: 'Brave', paths: ['/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'] },
]

function getBrowserCandidates() {
  if (process.platform === 'win32') return WINDOWS_BROWSERS
  if (process.platform === 'darwin') return MACOS_BROWSERS
  if (process.platform === 'linux') return LINUX_BROWSERS
  return []
}

function ensurePrivateProfile() {
  const defaultDir = path.join(PROFILE_DIR, 'Default')
  fs.mkdirSync(defaultDir, { recursive: true, mode: 0o700 })
  fs.writeFileSync(path.join(defaultDir, 'Preferences'), JSON.stringify({
    autofill: { credit_card_enabled: false, profile_enabled: false },
    credentials_enable_service: false,
    profile: { password_manager_enabled: false },
    safebrowsing: { enabled: true },
    signin: { allowed: false },
    sync: { suppress_start: true }
  }), { mode: 0o600 })
}

function getFlags(startUrl = 'https://chat.openai.com') {
  ensurePrivateProfile()
  return [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${PROFILE_DIR}`,
    '--disable-sync',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-component-update',
    '--disable-features=AutofillServerCommunication,PasswordManagerOnboarding,OptimizationHints,MediaRouter,Translate',
    '--disable-save-password-bubble',
    '--password-store=basic',
    '--no-first-run',
    '--no-default-browser-check',
    startUrl
  ]
}

function getInstalledBrowsers() {
  return getBrowserCandidates()
    .map(browser => {
      const browserPath = browser.paths.find(fs.existsSync)
      return browserPath ? { id: browser.id, name: browser.name, path: browserPath } : null
    })
    .filter(Boolean)
}

function waitForPort(port, host = '127.0.0.1', timeout = 5000) {
  const startedAt = Date.now()

  return new Promise((resolve, reject) => {
    function check() {
      const socket = net.createConnection({ port, host }, () => {
        socket.destroy()
        resolve()
      })

      socket.on('error', () => {
        socket.destroy()
        if (Date.now() - startedAt > timeout) {
          reject(new Error(`Browser launched, but debug port ${port} did not open`))
          return
        }
        setTimeout(check, 150)
      })
    }

    check()
  })
}

async function isDebugPortReady() {
  try {
    await waitForPort(DEBUG_PORT, '127.0.0.1', 350)
    return true
  } catch {
    return false
  }
}

function launchBrowser(browserPath, startUrl) {
  return new Promise(async (resolve, reject) => {
    if (await isDebugPortReady()) {
      resolve({ success: true, browser: browserPath || 'existing' })
      return
    }

    const installedBrowsers = getInstalledBrowsers()
    const paths = browserPath
      ? [browserPath].filter(p => installedBrowsers.some(browser => browser.path === p))
      : installedBrowsers.map(browser => browser.path)

    if (paths.length === 0) {
      reject(new Error(browserPath ? 'Selected browser was not found' : 'No supported browser found'))
      return
    }

    for (const browserPath of paths) {
      try {
        const child = spawn(browserPath, getFlags(startUrl), {
          detached: true,
          stdio: 'ignore'
        })

        child.unref()
        await waitForPort(DEBUG_PORT)
        resolve({ success: true, browser: browserPath })
        return
      } catch (err) {
        // Try the next installed browser before surfacing the launch failure.
      }
    }

    reject(new Error(`Could not launch a browser with remote debugging on port ${DEBUG_PORT}`))
  })
}

function cleanupPrivateProfile() {
  // Keep the dedicated browser profile so login sessions persist.
}

module.exports = { getInstalledBrowsers, launchBrowser, cleanupPrivateProfile }
