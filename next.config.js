/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/capsule-manager-page',
        destination: '/capsule-manager',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/capsule-manager', destination: '/capsule-manager-page' },
    ];
  },
};
module.exports = nextConfig;
