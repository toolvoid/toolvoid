import React, { useState, useEffect } from 'react'
import ApiKeyInput from '../components/ApiKeyInput'
import ModeToggle  from '../components/ModeToggle'

const PROVIDERS = [
  { id: 'gemini',   icon: 'G', name: 'Gemini', note: 'Google AI', badge: 'free', color: '#4285F4' },
  { id: 'grok',     icon: 'X', name: 'Grok', note: 'xAI provider', badge: 'paid', color: '#888' },
  { id: 'openai',   icon: 'O', name: 'ChatGPT', note: 'OpenAI models', badge: 'paid', color: '#10A37F' },
  { id: 'claude',   icon: 'C', name: 'Claude', note: 'Anthropic Claude', badge: 'paid', color: '#D4A574' },
  { id: 'deepseek', icon: 'D', name: 'DeepSeek', note: 'Low-cost inference', badge: 'paid', color: '#6366F1' },
]

const DEFAULT = { provider: 'gemini', apiKey: '', mode: 'manual', keyType: 'free' }

export default function Settings() {
  const [settings, set] = useState(DEFAULT)
  const [saved,  setSaved] = useState(false)

  useEffect(() => { window.capsule.getSettings().then(s => { if (s && s.provider) set(s) }) }, [])

  async function handleSave() {
    await window.capsule.saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page narrow">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Choose your provider and capsule save behavior.</p>
        </div>
      </div>

      <div className="settings-form">
        <div>
          <label className="field-label">AI Provider</label>
          <div className="provider-grid">
            {PROVIDERS.map(p => (
              <button
                key={p.id}
                type="button"
                className={`provider-option ${settings.provider === p.id ? 'active' : ''}`}
                onClick={() => set(s => ({ ...s, provider: p.id }))}
              >
                <span className="provider-icon" style={{ color: p.color }}>{p.icon}</span>
                <span>
                  <span className="provider-name">{p.name}</span>
                  <span className="provider-note">{p.note}</span>
                </span>
                <span className="provider-badge">{p.badge}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="field-label">Key type</label>
          <div className="segmented">
            {['free', 'paid'].map(type => (
              <button key={type} type="button" className={settings.keyType === type ? 'active' : ''} onClick={() => set(s => ({ ...s, keyType: type }))}>
                {type}
              </button>
            ))}
          </div>
        </div>

        <ApiKeyInput value={settings.apiKey} onChange={v => set(s => ({ ...s, apiKey: v }))} />
        <ModeToggle  mode={settings.mode} keyType={settings.keyType} onChange={m => set(s => ({ ...s, mode: m }))} />

        <button onClick={handleSave} className="button-primary" style={{ width: '100%', padding: '12px 16px' }}>
          {saved ? 'Saved' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
