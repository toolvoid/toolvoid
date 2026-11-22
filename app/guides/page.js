import Link from 'next/link';

export const metadata = {
  title: 'ToolVoid Guides',
  description: 'Guides with worked examples for ToolVoid tools.',
  alternates: { canonical: 'https://toolvoid.com/guides' },
};

export default function GuidesPage() {
  return (
    <main className="guides-index">
      <style>{`
        .guides-index { width: min(760px, 100%); margin: 0 auto; padding: 48px 16px 64px; color: var(--app-text); font-size: 16px; line-height: 1.7; }
        .guides-index h1 { margin: 0 0 24px; color: #f5f7fa; font-size: clamp(2rem, 7vw, 3.2rem); line-height: 1.12; }
        .guides-index-list { display: grid; gap: 16px; margin: 0; padding: 0; list-style: none; }
        .guides-index-card { display: block; padding: 20px 22px; border: 1px solid rgba(255,255,255,.16); border-radius: 16px; background: var(--app-surface); color: var(--app-text); text-decoration: none; overflow-wrap: anywhere; transition: border-color .16s ease, background-color .16s ease; }
        .guides-index-card:hover, .guides-index-card:focus-visible { border-color: #00ffb2; background: rgba(0,255,178,.08); cursor: pointer; }
        .guides-index-card:focus-visible { outline: 2px solid #00ffb2; outline-offset: 3px; }
        .guides-index-title { display: block; color: #00ffb2; font-size: 1.2rem; font-weight: 700; line-height: 1.35; }
        .guides-index-description { display: block; margin-top: 10px; color: var(--app-text); font-size: 16px; line-height: 1.6; }
        .guides-index-action { display: block; margin-top: 16px; color: #f5f7fa; font-size: 16px; font-weight: 600; }
        @media (max-width: 480px) { .guides-index { padding-top: 36px; } .guides-index-card { padding: 18px; } }
      `}</style>
      <h1>Guides</h1>
      <ul className="guides-index-list">
        <li>
          <Link className="guides-index-card" href="/guides/emi-calculation">
            <span className="guides-index-title">How EMI Is Calculated: A Worked Example for a Rs 5,00,000 Loan</span>
            <span className="guides-index-description">Step-by-step EMI calculation for a Rs 5,00,000 loan at 8.5% over 5 years, with a 3-year comparison.</span>
            <span className="guides-index-action">Read the guide →</span>
          </Link>
        </li>
      </ul>
    </main>
  );
}
