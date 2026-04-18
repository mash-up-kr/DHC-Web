import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'objectstorage.ap-chuncheon-1.oraclecloud.com',
        pathname: '/n/axircf8nexkb/b/dhc-storage/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/account-deletion.html',
        destination: '/account-deletion',
      },
    ];
  },
};

export default nextConfig;
