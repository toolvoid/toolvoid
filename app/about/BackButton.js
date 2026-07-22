'use client'

export default function BackButton() {
  return (
    <button onClick={() => history.back()} style={{ marginBottom: '2rem', border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: 'rgba(255,255,255,.7)', borderRadius: 999, padding: '.55rem 1rem', cursor: 'pointer' }}>
      ← Back
    </button>
  )
}
