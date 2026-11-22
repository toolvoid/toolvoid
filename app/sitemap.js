export default function sitemap() {
  const base = 'https://toolvoid.com';

  const routes = [
    { path: '', lastModified: '2026-08-09' },
    { path: '/about', lastModified: '2026-10-12' },
    { path: '/base64', lastModified: '2026-09-26' },
    { path: '/capsule-manager', lastModified: '2026-09-26' },
    { path: '/contact', lastModified: '2026-11-22' },
    { path: '/domain', lastModified: '2026-09-26' },
    { path: '/emi', lastModified: '2026-11-22' },
    { path: '/guides', lastModified: '2026-11-22' },
    { path: '/guides/emi-calculation', lastModified: '2026-11-22' },
    { path: '/hashtag', lastModified: '2026-11-22' },
    { path: '/imagegen', lastModified: '2026-11-22' },
    { path: '/indian-forms', lastModified: '2026-11-22' },
    { path: '/image-tools', lastModified: '2026-09-26' },
    { path: '/invoice', lastModified: '2026-09-26' },
    { path: '/json', lastModified: '2026-11-22' },
    { path: '/keyword', lastModified: '2026-09-26' },
    { path: '/loan', lastModified: '2026-09-26' },
    { path: '/one-brain', lastModified: '2026-10-26' },
    { path: '/passport', lastModified: '2026-09-26' },
    { path: '/password', lastModified: '2026-09-26' },
    { path: '/pdf', lastModified: '2026-11-22' },
    { path: '/privacy', lastModified: '2026-11-22' },
    { path: '/qr', lastModified: '2026-09-26' },
    { path: '/resume', lastModified: '2026-09-26' },
    { path: '/site-maker', lastModified: '2026-09-26' },
    { path: '/terms', lastModified: '2026-11-22' },
    { path: '/story', lastModified: '2026-09-26' },
    { path: '/tts', lastModified: '2026-09-26' },
    { path: '/unit', lastModified: '2026-09-26' },
    { path: '/video', lastModified: '2026-09-26' },
    { path: '/word-counter', lastModified: '2026-11-22' },
  ];

  return routes.map(({ path, lastModified }) => ({
    url: `${base}${path}`,
    lastModified: new Date(`${lastModified}T00:00:00.000Z`),
    changefreq: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
