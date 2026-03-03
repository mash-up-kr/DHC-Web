import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
