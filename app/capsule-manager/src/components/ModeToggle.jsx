import React from 'react'

export default function ModeToggle({ mode, keyType, onChange }) {
  return (
    <div>
      <label className="field-label">Save Mode</label>
      <div className="segmented">
        {['manual', 'auto'].map(m => (
          <button key={m} onClick={() => onChange(m)} className={mode === m ? 'active' : ''}>
            {m}
          </button>
        ))}
      </div>
      {mode === 'auto' && keyType === 'free' && (
        <p className="hint warning">Auto mode will use your free quota quickly. Switch to paid key for best results.</p>
      )}
    </div>
  )
}
