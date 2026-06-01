import React, { useState, useEffect } from 'react'
import TransferPanel from '../components/TransferPanel'

export default function CapsuleDetail({ id, navigate }) {
  const [capsule, setCapsule] = useState(null)
  const aiColors = { Claude: '#D4A574', ChatGPT: '#10A37F', Gemini: '#4285F4', DeepSeek: '#6366F1', Grok: '#888', Unknown: '#333' }

  useEffect(() => { if (id) window.capsule.getCapsule(id).then(setCapsule) }, [id])

  if (!capsule) return <div className="page narrow"><div className="empty-state">Loading...</div></div>
  const source = capsule.source_ai || 'Unknown'
  const sourceColor = aiColors[source] || '#777'
  const completed = capsule.progress?.completed || []
  const nextSteps = capsule.progress?.next_steps || []

  async function handleDelete() {
    if (!confirm('Delete this capsule?')) return
    await window.capsule.deleteCapsule(id)
    navigate('capsules')
  }

  return (
    <div className="page narrow">
      <button onClick={() => navigate('capsules')} className="back-button">← Back</button>

      <div className="page-header">
        <div>
          <div className="detail-meta">
            <span className="source-dot" style={{ background: sourceColor }} />
            <span>{new Date(capsule.created_at).toLocaleString()}</span>
          </div>
          <h1 className="page-title">{capsule.title || 'Untitled Capsule'}</h1>
        </div>
        <button onClick={handleDelete} className="button-danger">Delete</button>
      </div>

      <div className="detail-card summary-card">
        <div className="section-label">Continuation context</div>
        {capsule.summary_error && <p className="warning" style={{ marginBottom: 10 }}>AI generation failed: {capsule.summary_error}</p>}
        <p>{capsule.summary || 'No continuation context available.'}</p>
      </div>

      <div className="detail-card">
        <div className="section-label">Progress</div>
        {completed.length > 0 && (
          <div className="detail-list">
            {completed.map((item, index) => (
              <div key={index} className="detail-row">
                <span className="detail-icon success">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {capsule.progress?.current && (
          <div className="current-block">
            <span className="section-label">Current status</span>
            <p><span className="detail-icon orange">●</span>{capsule.progress.current}</p>
          </div>
        )}

        {nextSteps.length > 0 && (
          <div className="detail-list">
            {nextSteps.map((item, index) => (
              <div key={index} className="detail-row">
                <span className="detail-icon gold">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {completed.length === 0 && !capsule.progress?.current && nextSteps.length === 0 && (
          <p className="muted-copy">No progress extracted yet.</p>
        )}
      </div>

      {capsule.key_decisions?.length > 0 && (
        <div className="detail-card">
          <div className="section-label">Key decisions</div>
          <div className="detail-list">
            {capsule.key_decisions.map((item, index) => (
              <div key={index} className="detail-row">
                <span className="detail-icon">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {capsule.important_context && (
        <div className="detail-card">
          <div className="section-label">Important context</div>
          <p>{capsule.important_context}</p>
        </div>
      )}

      {capsule.tags?.length > 0 && (
        <div className="detail-card">
          <div className="section-label">Tags</div>
          <div className="tag-row">
            {capsule.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
          </div>
        </div>
      )}

      <TransferPanel capsule={capsule} />
    </div>
  )
}
