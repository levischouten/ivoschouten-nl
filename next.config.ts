import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/keystatic",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
