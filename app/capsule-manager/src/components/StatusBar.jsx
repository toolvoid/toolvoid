import React, { useState, useEffect } from 'react'

export default function StatusBar() {
  const [s, setS] = useState({})
  useEffect(() => { window.capsule.getSettings().then(setS) }, [])

  return (
    <div className="status-bar">
      <span className="status-item"><i className="status-dot" />Provider <span className="status-value">{s.provider || 'unset'}</span></span>
      <span className="status-item"><i className="status-dot orange" />Mode <span className="status-value">{s.mode || 'manual'}</span></span>
      <span className="status-item"><i className={`status-dot ${s.apiKey ? 'green' : 'red'}`} />Key <span className="status-value">{s.apiKey ? 'set' : 'not set'}</span></span>
    </div>
  )
}
