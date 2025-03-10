/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
  // serverActionsの設定を削除（Next.js 14以降はデフォルトで有効）
  typescript: {
    // 開発時は型チェックを有効に
    ignoreBuildErrors: true
  },
  eslint: {
    // 開発時は有効に
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // 実験的機能の設定
  experimental: {
    // 必要な実験的機能があれば追加
  }
};

module.exports = nextConfig; 