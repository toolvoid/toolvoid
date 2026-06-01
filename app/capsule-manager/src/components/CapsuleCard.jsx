import React from 'react'

export default function CapsuleCard({ capsule, onClick }) {
  const aiColors = { Claude: '#D4A574', ChatGPT: '#10A37F', Gemini: '#4285F4', DeepSeek: '#6366F1', Grok: '#888', Unknown: '#333' }
  const source = capsule.source_ai || 'Unknown'
  const color = aiColors[source] || '#333'
  const summary = capsule.summary || 'No continuation context available yet.'

  return (
    <article onClick={onClick} className="capsule-card" style={{ '--source-color': color }}>
      <div className="capsule-card-top">
        <h2 className="capsule-title">{capsule.title || 'Untitled capsule'}</h2>
        <span className="ai-badge"><i style={{ background: color }} />{source}</span>
      </div>
      <p className="capsule-summary">{summary}</p>
      <div className="capsule-card-bottom">
        <div className="tag-row">
          {capsule.tags?.slice(0, 4).map(t => <span key={t} className="tag-pill">{t}</span>)}
        </div>
        <span className="capsule-time">{capsule.created_at ? new Date(capsule.created_at).toLocaleString() : ''}</span>
      </div>
    </article>
  )
}
