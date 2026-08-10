import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [],
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
