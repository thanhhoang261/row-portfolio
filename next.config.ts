import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Keystatic (GitHub mode) redirects localhost -> 127.0.0.1; Next dev blocks that origin by default.
  allowedDevOrigins: ["127.0.0.1"],
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
