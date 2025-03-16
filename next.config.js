/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;