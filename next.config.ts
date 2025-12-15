import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore type and ESLint errors during build as requested
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone',
  experimental: {
    // speed up prod builds if available in this Next version
    turbo: {
      // leave default; just ensure turbopack usage is compatible
    }
  }
};

export default nextConfig;
