import React, { useState } from 'react'
import Dashboard     from './pages/Dashboard'
import Capsules      from './pages/Capsules'
import CapsuleDetail from './pages/CapsuleDetail'
import Settings      from './pages/Settings'

const NAV = [
  { id: 'dashboard', icon: '⌂', label: 'Home' },
  { id: 'capsules',  icon: '◈', label: 'Capsules' },
  { id: 'settings',  icon: '✦', label: 'Settings' },
]

export default function App() {
  const [page, setPage]       = useState('dashboard')
  const [selectedId, setId]   = useState(null)

  function navigate(p, id = null) { setPage(p); setId(id) }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">C</div>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => navigate(n.id)}
            title={n.label}
            className={`sidebar-button ${page === n.id ? 'active' : ''}`}
          >
            {n.icon}
          </button>
        ))}
      </aside>

      <main className="main-panel">
        {page === 'dashboard'      && <Dashboard     navigate={navigate} />}
        {page === 'capsules'       && <Capsules       navigate={navigate} />}
        {page === 'capsule-detail' && <CapsuleDetail  id={selectedId} navigate={navigate} />}
        {page === 'settings'       && <Settings />}
      </main>
    </div>
  )
}
