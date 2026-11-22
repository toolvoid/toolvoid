import Link from 'next/link';

export const metadata = {
  title: 'ToolVoid Guides',
  description: 'Guides with worked examples for ToolVoid tools.',
  alternates: { canonical: 'https://toolvoid.com/guides' },
};

export default function GuidesPage() {
  return (
    <main style={{ width: 'min(760px, calc(100% - 32px))', margin: '0 auto', padding: '48px 0 64px', fontSize: 16, lineHeight: 1.75 }}>
      <h1 style={{ margin: '0 0 24px', color: '#f5f7fa', fontSize: 'clamp(2rem, 7vw, 3.2rem)', lineHeight: 1.12 }}>Guides</h1>
      <ul style={{ paddingLeft: 24, fontSize: 16, lineHeight: 1.75 }}>
        <li><Link href="/guides/emi-calculation">How EMI Is Calculated: A Worked Example for a Rs 5,00,000 Loan</Link></li>
      </ul>
    </main>
  );
}
