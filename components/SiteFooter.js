import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="site-footer-brand" href="/">ToolVoid</Link>
      <p className="site-footer-notice">No account needed for most tools. Ads and basic analytics use cookies (see Privacy Policy).</p>
      <nav className="site-footer-links" aria-label="Footer navigation">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
