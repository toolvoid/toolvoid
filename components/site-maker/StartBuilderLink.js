'use client';

import Link from 'next/link';

export default function StartBuilderLink({ className, children }) {
  const confirmStart = (event) => {
    const proceed = window.confirm('Important: Site Maker does not auto-save your work yet. If you refresh, close the tab, or leave the builder, unsaved changes may be lost.\n\nDo you want to continue?');
    if (!proceed) event.preventDefault();
  };
  return <Link href="/site-maker/create" className={className} onClick={confirmStart}>{children}</Link>;
}
