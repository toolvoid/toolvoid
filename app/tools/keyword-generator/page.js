 'use client'

import Link from 'next/link'

export default function KeywordGuidePage() {
  return (
    <main style={styles.main}><div style={styles.wrap}>
      <button onClick={() => history.back()} style={styles.back}>← Back</button>
      <h1>Keyword Generator Guide</h1>
      <p style={styles.muted}>Generate SEO keyword ideas with keyword type, intent, difficulty, and volume labels.</p>
      <h2>How To Use</h2>
      <ol><li>Enter a topic or niche.</li><li>Select content type, audience, and country.</li><li>Add an optional seed keyword.</li><li>Generate, filter, copy, or export keywords.</li></ol>
      <p style={styles.muted}>Daily limit: 10 free per day.</p>
      <Link href="/keyword-generator" style={styles.cta}>Open Tool</Link>
    </div></main>
  )
}

const styles = { main: { minHeight: '100vh', background: '#07070f', color: '#f0f0fa', padding: '5rem 1.25rem', fontFamily: 'system-ui, sans-serif' }, wrap: { maxWidth: 760, margin: '0 auto', lineHeight: 1.8 }, muted: { color: 'rgba(255,255,255,.65)' }, back: { border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: 'rgba(255,255,255,.7)', borderRadius: 999, padding: '.55rem 1rem', cursor: 'pointer' }, cta: { display: 'inline-block', marginTop: '1rem', padding: '.75rem 1.15rem', borderRadius: 10, background: '#34d399', color: '#071a0f', textDecoration: 'none', fontWeight: 700 } }
