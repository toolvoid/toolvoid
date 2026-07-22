 'use client'

import Link from 'next/link'

export default function StoryGuidePage() {
  return <Guide title="Script Generator Guide" toolHref="/story-generator" limit="3 free scripts per day" items={['Select a genre', 'Fill characters', 'Set the scene', 'Add plot details', 'Set duration & pace', 'Generate script with segments']} tips={['Set a specific topic for better results.', 'Use custom instructions to override genre defaults.', 'Choose the right pace for your content type.']} />
}

function Guide({ title, toolHref, limit, items, tips }) {
  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <button onClick={() => history.back()} style={styles.back}>← Back</button>
        <h1>{title}</h1>
        <p style={styles.muted}>Create cinematic AI stories from your genre, characters, setting, and plot ideas.</p>
        <h2>How To Use</h2>
        <ol>{items.map(item => <li key={item}>{item}</li>)}</ol>
        <h2>Tips</h2>
        <ul>{tips.map(tip => <li key={tip}>{tip}</li>)}</ul>
        <p style={styles.muted}>Daily limit: {limit}.</p>
        <Link href={toolHref} style={styles.cta}>Open Tool</Link>
      </div>
    </main>
  )
}

const styles = { main: { minHeight: '100vh', background: '#07070f', color: '#f0f0fa', padding: '5rem 1.25rem', fontFamily: 'system-ui, sans-serif' }, wrap: { maxWidth: 760, margin: '0 auto', lineHeight: 1.8 }, muted: { color: 'rgba(255,255,255,.65)' }, back: { border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: 'rgba(255,255,255,.7)', borderRadius: 999, padding: '.55rem 1rem', cursor: 'pointer' }, cta: { display: 'inline-block', marginTop: '1rem', padding: '.75rem 1.15rem', borderRadius: 10, background: '#a78bfa', color: '#07070f', textDecoration: 'none', fontWeight: 700 } }
