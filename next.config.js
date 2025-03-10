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
    // ビルド時の型チェックを一時的に無効化
    ignoreBuildErrors: true
  },
  eslint: {
    // ビルド時のESLintチェックを一時的に無効化
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  reactStrictMode: true
};

module.exports = nextConfig; 