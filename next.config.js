/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/story-generator',
        destination: '/story',
        permanent: true,
      },
      {
        source: '/tools/hashtag-generator',
        destination: '/hashtag',
        permanent: true,
      },
      {
        source: '/tools/image-generator',
        destination: '/imagegen',
        permanent: true,
      },
      {
        source: '/tools/keyword-generator',
        destination: '/keyword',
        permanent: true,
      },
      {
        source: '/tools/story-generator',
        destination: '/story',
        permanent: true,
      },
      {
        source: '/capsule-manager-page',
        destination: '/capsule-manager',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
