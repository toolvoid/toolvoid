import React, { useState } from 'react'

const AI_SITES = [
  { name: 'ChatGPT',  url: 'https://chat.openai.com',  color: '#10A37F' },
  { name: 'Gemini',   url: 'https://gemini.google.com',color: '#4285F4' },
  { name: 'DeepSeek', url: 'https://chat.deepseek.com',color: '#6366F1' },
  { name: 'Grok',     url: 'https://x.com/i/grok',     color: '#aaa' },
  { name: 'Claude',   url: 'https://claude.ai',         color: '#D4A574' },
]

export default function TransferPanel({ capsule }) {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')
  const [transferring, setTransferring] = useState('')

  function handleCopy() {
    navigator.clipboard.writeText(capsule.transfer_prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleTransfer(ai) {
    if (transferring) return
    setTransferring(ai.name)
    setStatus(`Opening ${ai.name}...`)
    try {
      await window.capsule.transferCapsule({ url: ai.url, prompt: capsule.transfer_prompt })
      setStatus(`${ai.name} opened with capsule filled`)
      setTimeout(() => setStatus(''), 3000)
    } catch (err) {
      setStatus('Error: ' + err.message)
    } finally {
      setTransferring('')
    }
  }

  return (
    <div className="section-card" style={{ marginTop: 20 }}>
      <div className="section-label">Transfer capsule to</div>
      <div className="transfer-links">
        {AI_SITES.map(ai => (
          <button key={ai.name} type="button" onClick={() => handleTransfer(ai)} disabled={Boolean(transferring)}
            className="transfer-link"
            style={{ color: ai.color, borderColor: `${ai.color}40` }}>
            {transferring === ai.name ? 'Opening...' : ai.name}
          </button>
        ))}
      </div>
      <button onClick={handleCopy} className="button-primary" style={{ width: '100%', color: copied ? '#4ade80' : '#0b0b0b', background: copied ? '#122016' : undefined, borderColor: copied ? 'rgba(74, 222, 128, 0.28)' : undefined }}>
        {copied ? 'Copied to clipboard' : 'Copy Capsule Prompt'}
      </button>
      <p className="hint" style={{ textAlign: 'center' }}>{status || 'Open an AI and the capsule will be filled into the prompt box.'}</p>
    </div>
  )
}
