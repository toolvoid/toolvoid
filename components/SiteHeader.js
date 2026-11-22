import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-header-inner" aria-label="Main navigation">
        <Link className="site-brand" href="/" aria-label="ToolVoid home">ToolVoid</Link>
        <div className="site-header-links">
          <Link href="/#tools">Tools</Link>
          <Link href="/about">About</Link>
          <Link href="/guides">Guides</Link>
        </div>
      </nav>
    </header>
  );
}
