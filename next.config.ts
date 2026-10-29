import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: Cloudflare serves the generated files in ./out directly.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
