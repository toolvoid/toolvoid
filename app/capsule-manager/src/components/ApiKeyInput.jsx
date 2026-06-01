import React, { useState } from 'react'

export default function ApiKeyInput({ value, onChange }) {
  const [show, setShow] = useState(false)

  return (
    <div>
      <label className="field-label">API Key</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)} placeholder="Paste your API key" style={{ flex: 1 }} />
        <button onClick={() => setShow(!show)} style={{ width: 42, padding: 0 }}>{show ? 'Hide' : 'Show'}</button>
      </div>
      <p className="hint">Encrypted on this PC and only used when creating the continuation context.</p>
    </div>
  )
}
