export default function sitemap() {
  const base = 'https://toolvoid.com';
  
  const routes = [
    '',
    '/about',
    '/base64',
    '/domain',
    '/emi',
    '/hashtag',
    '/hashtag-generator',
    '/image-generator',
    '/image-tools',
    '/imagegen',
    '/invoice',
    '/json',
    '/keyword',
    '/keyword-generator',
    '/loan',
    '/passport',
    '/password',
    '/pdf',
    '/privacy',
    '/qr',
    '/resume',
    '/story',
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