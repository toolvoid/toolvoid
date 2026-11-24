import Link from 'next/link'
import BackButton from './BackButton'

export const metadata = {
  title: 'About ToolVoid | ToolVoid',
  description: 'ToolVoid is a set of free online tools built by Sparsh Pathak for creators and everyday users in India.',
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
          Hi, I&apos;m Sparsh Pathak, the person behind ToolVoid. I am originally from Himachal Pradesh, and I live in Punjab.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '.75rem' }}>Why I started ToolVoid</h2>
        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          I started ToolVoid in 2026. Many content creators need small online tools every day, but they cannot pay for expensive subscriptions. I built ToolVoid for them, so the tools are easy to use and free to start with.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '.75rem' }}>What you can find here</h2>
        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          ToolVoid has tools for everyday tasks. These include an EMI calculator, a JSON formatter, PDF tools, image tools, and a photo and signature resizer for Indian exam forms. There are also AI tools for hashtags, keywords, scripts and images. The Guides section has step-by-step guides with worked examples.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '.75rem' }}>How ToolVoid earns money</h2>
        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          ToolVoid is free to use. The site shows Google ads. Some AI features have daily limits, and you can buy optional packs if you want more. The Privacy Policy explains how cookies and ads work.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '.75rem' }}>Who runs it</h2>
        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          I build and run ToolVoid myself. You can find me here: <a href="https://www.linkedin.com/in/sparsh-pathak-330118330/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Sparsh Pathak on LinkedIn</a>.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '.75rem' }}>Contact</h2>
        <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
          Write to <a href="mailto:hello@toolvoid.com" style={{ color: 'inherit' }}>hello@toolvoid.com</a>, or use the <Link href="/contact" style={{ color: 'inherit' }}>Contact page</Link>.
        </p>
      </div>
    </main>
  )
}
