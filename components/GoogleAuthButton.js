'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function GoogleAuthButton({ compact = false }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <span className="ai-auth-chip">{compact ? 'Checking…' : 'Checking account…'}</span>;
  }

  if (!session?.user) {
    return (
      <button
        type="button"
        className="ai-auth-btn"
        onClick={() => signIn('google', { callbackUrl: pathname || '/' })}
      >
        {compact ? 'Sign In' : 'Sign in with Google'}
      </button>
    );
  }

  return (
    <div className="ai-auth-user">
      <span className="ai-auth-chip" title={session.user.email || session.user.name || 'Signed in'}>
        {compact ? (session.user.name || 'Account') : (session.user.email || session.user.name || 'Signed in')}
      </span>
      <button
        type="button"
        className="ai-auth-btn ghost"
        onClick={() => signOut({ callbackUrl: pathname || '/' })}
      >
        Logout
      </button>
    </div>
  );
}
