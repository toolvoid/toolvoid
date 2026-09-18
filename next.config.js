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
        source: '/capsule-manager-page',
        destination: '/capsule-manager',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
