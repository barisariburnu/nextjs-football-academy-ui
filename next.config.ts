import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nextjs-football-academy-ui",
  // GitHub Pages requirements
  images: {
    unoptimized: true,
  },
  // Skip linting/typing during build for faster/easier deployment of UI-only projects
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
