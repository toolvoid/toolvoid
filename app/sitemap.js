export default function sitemap() {
  const base = 'https://toolvoid.com';

  const routes = [
    '',
    '/about',
    '/base64',
    '/capsule-manager',
    '/domain',
    '/emi',
    '/hashtag',
    '/imagegen',
    '/indian-forms',
    '/image-tools',
    '/invoice',
    '/json',
    '/keyword',
    '/loan',
    '/passport',
    '/password',
    '/pdf',
    '/privacy',
    '/qr',
    '/resume',
    '/story',
    '/site-maker',
    '/terms',
    '/tools',
    '/tts',
    '/unit',
    '/video',
    '/word-counter',
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changefreq: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));
}
