'use client';

import { useEffect } from 'react';

export default function AppThemeShell() {
  useEffect(() => {
    document.documentElement.dataset.appTheme = 'dark';
    document.body.dataset.appTheme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
    window.dispatchEvent(new CustomEvent('toolsite-theme-change', { detail: { theme: 'dark' } }));
  }, []);

  return null;
}
