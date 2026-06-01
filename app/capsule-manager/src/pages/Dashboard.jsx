import React, { useState, useEffect, useRef } from 'react'
import CapsuleCard from '../components/CapsuleCard'
import StatusBar   from '../components/StatusBar'

export default function Dashboard({ navigate }) {
  const [capsules, setCapsules] = useState([])
  const [saving,   setSaving]   = useState(false)
  const [status,   setStatus]   = useState('')
  const [browsers, setBrowsers] = useState([])
  const [browserPath, setBrowserPath] = useState('')
  const [capsuleTitle, setCapsuleTitle] = useState('')
  const saveInFlightRef = useRef(false)

  useEffect(() => {
    window.capsule.getCapsules().then(setCapsules)
    window.capsule.getBrowsers().then(list => {
      setBrowsers(list)
      if (list.length > 0) setBrowserPath(list[0].path)
    })
  }, [])

  async function handleLaunchBrowser() {
    setStatus('Opening browser...')
    try {
      const result = await window.capsule.launchBrowser(browserPath)
      const browser = browsers.find(b => b.path === result.browser)
      setStatus(`${browser?.name || 'Browser'} ready`)
      setTimeout(() => setStatus(''), 2500)
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }

  async function handleSave() {
    if (saveInFlightRef.current) return
    saveInFlightRef.current = true
    setSaving(true)
    setStatus('Reading chat...')
    const summarizeTimer = setTimeout(() => setStatus('Summarizing...'), 800)
    try {
      const title = capsuleTitle.trim()
      const saved = await window.capsule.readChat({ title })

      if (!saved.success) throw new Error(saved.error)

      setCapsules(prev => [saved, ...prev])
      setCapsuleTitle('')
      setStatus(saved.summary_error ? 'Saved with fallback: ' + saved.summary_error : 'Saved ✓')
      setTimeout(() => setStatus(''), 3000)
    } catch (err) {
      setStatus('Error: ' + err.message)
    } finally {
      clearTimeout(summarizeTimer)
      saveInFlightRef.current = false
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <StatusBar />
      <div className="page-header">
        <div>
          <h1 className="page-title">Capsules</h1>
          <p className="page-subtitle">Your saved AI context</p>
        </div>
        <div className="actions">
          {status && <span className="status-message">{status}</span>}
          <input
            className="title-input"
            placeholder="Capsule name"
            value={capsuleTitle}
            onChange={e => setCapsuleTitle(e.target.value)}
          />
          <select className="browser-select" value={browserPath} onChange={e => setBrowserPath(e.target.value)} disabled={browsers.length === 0}>
            {browsers.length === 0
              ? <option>No browser found</option>
              : browsers.map(browser => <option key={browser.path} value={browser.path}>{browser.name}</option>)
            }
          </select>
          <button onClick={handleLaunchBrowser} disabled={browsers.length === 0}>Open Browser</button>
          <button onClick={handleSave} disabled={saving} className="button-primary">
            {saving ? 'Saving...' : 'Save Capsule'}
          </button>
        </div>
      </div>
      {capsules.length === 0
        ? <div className="empty-state"><div className="empty-symbol">◈</div><h2>No capsules yet</h2><p>Open a browser, chat with any AI, then save.</p></div>
        : <div className="capsule-grid">{capsules.slice(0, 6).map(c => <CapsuleCard key={c.capsule_id} capsule={c} onClick={() => navigate('capsule-detail', c.capsule_id)} />)}</div>
      }
    </div>
  )
}
