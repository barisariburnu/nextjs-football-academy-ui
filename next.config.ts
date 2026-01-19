import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nextjs-football-academy-ui",
  assetPrefix: "/nextjs-football-academy-ui",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
