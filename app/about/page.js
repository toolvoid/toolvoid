import Link from 'next/link'
import BackButton from './BackButton'

export const metadata = {
  title: 'About ToolVoid - Free Online Tools for Creators & Builders',
  description: 'ToolVoid is a small collection of free browser tools built for creators, marketers, students, and everyday users who want practical help without a signup maze.',
  alternates: {
    canonical: 'https://toolvoid.com/about',
  },
}

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#07070f', color: '#f0f0fa', padding: '5rem 1.25rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <BackButton />
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '1rem' }}>About ToolVoid</h1>

        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          ToolVoid is a small set of free online tools built for people who want quick answers without dealing with bloated apps, signups, or confusing workflows. The site started as a simple idea: make useful utilities available in the browser, fast and without friction.
        </p>

        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
          It was built by a solo developer who likes practical tools for writing, image work, SEO, productivity, and everyday digital tasks. The goal was to keep the experience honest and useful: no heavy dashboard, no fake “premium” funnel, just tools that actual people can open and use without much setup.
        </p>

        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
          ToolVoid covers the small jobs that show up repeatedly — generating scripts, hashtags, keywords, checking domains, converting files, creating invoices, and making life a little easier while working online. If a tool saves time or removes a tedious step, it belongs here.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          <Link href="/story-generator" style={{ display: 'block', padding: '1rem 1.15rem', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, color: 'inherit', textDecoration: 'none', background: '#0c0c1a' }}>
            <strong>Script Generator</strong>
            <div style={{ color: 'rgba(255,255,255,.62)', marginTop: '.35rem' }}>Turn a topic into structured AI video ideas and scripts.</div>
          </Link>
          <Link href="/hashtag-generator" style={{ display: 'block', padding: '1rem 1.15rem', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, color: 'inherit', textDecoration: 'none', background: '#0c0c1a' }}>
            <strong>Hashtag Generator</strong>
            <div style={{ color: 'rgba(255,255,255,.62)', marginTop: '.35rem' }}>Draft social content ideas in seconds.</div>
          </Link>
          <Link href="/keyword-generator" style={{ display: 'block', padding: '1rem 1.15rem', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, color: 'inherit', textDecoration: 'none', background: '#0c0c1a' }}>
            <strong>Keyword Generator</strong>
            <div style={{ color: 'rgba(255,255,255,.62)', marginTop: '.35rem' }}>Generate SEO-friendly keyword ideas for content work.</div>
          </Link>
        </div>
      </div>
    </main>
  )
}
