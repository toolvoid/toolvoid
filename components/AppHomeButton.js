'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppHomeButton() {
  const pathname = usePathname();
  const aiToolPaths = [
    '/story',
    '/story',
    '/hashtag',
    '/hashtag-generator',
    '/keyword',
    '/imagegen',
  ];

  if (pathname === '/' || pathname?.startsWith('/resume') || aiToolPaths.includes(pathname)) return null;

  return (
    <Link href="/" className="app-home-button" aria-label="Back to TooL Void home">
      <span className="app-home-button-icon" aria-hidden="true">←</span>
      <span className="app-home-button-label">TooL Void</span>
    </Link>
  );
}
