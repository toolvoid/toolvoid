'use client';

import { useEffect } from 'react';

function applyTheme(theme) {
  const resolvedTheme = theme === 'light' ? 'light' : 'dark';

  document.documentElement.dataset.appTheme = resolvedTheme;
  document.body.dataset.appTheme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
  document.body.style.background = resolvedTheme === 'dark' ? '#060609' : '#f5f7fb';
  document.body.style.color = resolvedTheme === 'dark' ? '#c9d1d9' : '#111827';
}

export default function AppThemeShell() {
  useEffect(() => {
    applyTheme('dark');
    window.dispatchEvent(new CustomEvent('toolvoid-theme-change', { detail: { theme: 'dark' } }));

    const handleThemeEvent = (event) => {
      applyTheme(event.detail?.theme || 'dark');
    };

    window.addEventListener('toolvoid-theme-change', handleThemeEvent);

    return () => {
      window.removeEventListener('toolvoid-theme-change', handleThemeEvent);
    };
  }, []);

  return null;
}
