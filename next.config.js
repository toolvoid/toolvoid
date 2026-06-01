/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/capsule-manager', destination: '/capsule-manager-page' },
    ];
  },
};
module.exports = nextConfig;
