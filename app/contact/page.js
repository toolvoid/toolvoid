import Link from 'next/link';

export const metadata = {
  title: 'Contact ToolVoid',
  description: 'Get in touch with ToolVoid about support, questions, or feedback.',
};

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#07070f', color: '#f0f0fa', padding: '5rem 1.25rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/" style={{ color: '#8fe7c8', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Back to ToolVoid
        </Link>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1rem' }}>Contact</h1>
        <p style={{ color: 'rgba(255,255,255,.72)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
          For support, feedback, or questions about the tools on ToolVoid, send us a message below or email us directly.
        </p>

        <div style={{ background: '#0d0f1a', border: '1px solid rgba(255,255,255,.08)', borderRadius: 18, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.6rem', color: '#8fe7c8', fontWeight: 700 }}>Email</p>
          <a href="mailto:0voidtool0@gmail.com" style={{ color: '#f0f0fa', textDecoration: 'none', fontSize: '1.05rem' }}>
            0voidtool0@gmail.com
          </a>
        </div>

        <form action="mailto:0voidtool0@gmail.com" method="post" encType="text/plain" style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.45rem', color: 'rgba(255,255,255,.8)' }}>Name</label>
            <input id="name" name="name" type="text" style={{ width: '100%', background: '#0d0f1a', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, padding: '0.9rem 1rem', color: '#f0f0fa' }} />
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.45rem', color: 'rgba(255,255,255,.8)' }}>Email</label>
            <input id="email" name="email" type="email" style={{ width: '100%', background: '#0d0f1a', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, padding: '0.9rem 1rem', color: '#f0f0fa' }} />
          </div>

          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.45rem', color: 'rgba(255,255,255,.8)' }}>Message</label>
            <textarea id="message" name="message" rows="7" style={{ width: '100%', background: '#0d0f1a', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, padding: '0.9rem 1rem', color: '#f0f0fa', resize: 'vertical' }} />
          </div>

          <button type="submit" style={{ justifySelf: 'start', background: '#00FFB2', color: '#07110d', border: 'none', borderRadius: 999, padding: '0.85rem 1.4rem', fontWeight: 700, cursor: 'pointer' }}>
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
