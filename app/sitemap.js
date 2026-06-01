export default function sitemap() {
  const base = 'https://toolvoid.com';
  
  const routes = [
    '',
    '/about',
    '/base64',
    '/capsule-manager',
    '/domain',
    '/emi',
    '/hashtag-generator',
    '/image-generator',
    '/image-tools',
    '/invoice',
    '/json',
    '/keyword-generator',
    '/loan',
    '/passport',
    '/password',
    '/pdf',
    '/privacy',
    '/qr',
    '/resume',
    '/story-generator',
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
  }));
}
