 'use client'

import Link from 'next/link'

export default function ImageGuidePage() {
  return (
    <main style={styles.main}><div style={styles.wrap}>
      <button onClick={() => history.back()} style={styles.back}>← Back</button>
      <h1>Image Generator Guide</h1>
      <p style={styles.muted}>Generate AI images from prompts, styles, moods, and aspect ratios. Powered by Pollinations AI.</p>
      <h2>How To Use</h2>
      <ol><li>Describe the image you want.</li><li>Choose a style, mood, and ratio.</li><li>Optionally add a negative prompt.</li><li>Generate and download the image.</li></ol>
      <p style={styles.muted}>Daily limit: 6 free per day.</p>
      <Link href="/image-generator" style={styles.cta}>Open Tool</Link>
    </div></main>
  )
}

const styles = { main: { minHeight: '100vh', background: '#07070f', color: '#f0f0fa', padding: '5rem 1.25rem', fontFamily: 'system-ui, sans-serif' }, wrap: { maxWidth: 760, margin: '0 auto', lineHeight: 1.8 }, muted: { color: 'rgba(255,255,255,.65)' }, back: { border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: 'rgba(255,255,255,.7)', borderRadius: 999, padding: '.55rem 1rem', cursor: 'pointer' }, cta: { display: 'inline-block', marginTop: '1rem', padding: '.75rem 1.15rem', borderRadius: 10, background: '#f59e0b', color: '#1a1507', textDecoration: 'none', fontWeight: 700 } }
