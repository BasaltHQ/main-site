import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore type and ESLint errors during build as requested
  typescript: { ignoreBuildErrors: true },
  output: 'standalone',
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
