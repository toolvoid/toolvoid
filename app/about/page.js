 'use client'

import Link from 'next/link'

const tools = [
  ['Script Generator', '/story-generator', 'Generate timed AI video scripts with narration & visuals. 3 free per day.'],
  ['Hashtag Generator', '/hashtag-generator', 'Generate hashtags for social media. 10 free per day.'],
  ['Keyword Generator', '/keyword-generator', 'Generate SEO keywords. 10 free per day.'],
  ['Image Generator', '/image-generator', 'Generate AI images with Pollinations. 6 free per day.'],
]

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#07070f', color: '#f0f0fa', padding: '5rem 1.25rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <button onClick={() => history.back()} style={{ marginBottom: '2rem', border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: 'rgba(255,255,255,.7)', borderRadius: 999, padding: '.55rem 1rem', cursor: 'pointer' }}>← Back</button>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '1rem' }}>About TooL Void</h1>
        <p style={{ color: 'rgba(255,255,255,.68)', lineHeight: 1.8, fontSize: '1.05rem' }}>TooL Void is a collection of free AI tools for creators, marketers, writers, and anyone who wants quick help generating useful content.</p>

        <h2 style={{ marginTop: '3rem' }}>Tools</h2>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          {tools.map(([name, href, desc]) => (
            <Link key={name} href={href} style={{ display: 'block', padding: '1.1rem', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, color: 'inherit', textDecoration: 'none', background: '#0c0c1a' }}>
              <strong>{name}</strong>
              <p style={{ margin: '.35rem 0 0', color: 'rgba(255,255,255,.62)' }}>{desc}</p>
            </Link>
          ))}
        </div>

        <h2 style={{ marginTop: '3rem' }}>How To Use</h2>
        <ol style={{ color: 'rgba(255,255,255,.72)', lineHeight: 1.9 }}>
          <li>Open the AI tool you want to use.</li>
          <li>Open the tool you want to use.</li>
          <li>Fill in the prompt or required fields.</li>
          <li>Click generate and copy or download the result.</li>
        </ol>
        <p style={{ color: 'rgba(255,255,255,.62)' }}>AI tools include free daily limits that reset at midnight.</p>
      </div>
    </main>
  )
}
