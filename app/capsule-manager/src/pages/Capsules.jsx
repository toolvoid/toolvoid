import React, { useState, useEffect } from 'react'
import CapsuleCard from '../components/CapsuleCard'

export default function Capsules({ navigate }) {
  const [capsules, setCapsules] = useState([])
  const [search,   setSearch]   = useState('')

  useEffect(() => { window.capsule.getCapsules().then(setCapsules) }, [])

  const filtered = capsules.filter(c =>
    (c.title    || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.summary  || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Capsules</h1>
          <p className="page-subtitle">Search across saved titles and summaries.</p>
        </div>
      </div>
      <input className="search-input" placeholder="Search capsules..." value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.length === 0
        ? <div className="empty-state">No capsules found.</div>
        : <div className="capsule-grid">{filtered.map(c => <CapsuleCard key={c.capsule_id} capsule={c} onClick={() => navigate('capsule-detail', c.capsule_id)} />)}</div>
      }
    </div>
  )
}
