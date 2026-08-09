export const metadata = {
  alternates: {
    canonical: 'https://toolvoid.com/',
  },
};

import HomeClient from './HomeClient';

export default function Home() {
  return (
    <>
      <HomeClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ToolVoid',
            url: 'https://toolvoid.com',
            logo: 'https://toolvoid.com/icon-512.png',
          }),
        }}
      />
    </>
  );
}
