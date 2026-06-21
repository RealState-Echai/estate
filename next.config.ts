import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Static Site Generation -> fully static HTML export into ./out
  output: "export",

  // Clean URLs as directories (e.g. /properties/villa/ -> index.html).
  // Best for static hosts (Netlify, GitHub Pages, S3, Nginx).
  trailingSlash: true,

  // next/image cannot use the optimization server in a static export,
  // so images are served as-is. Remote hosts must still be allow-listed.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Fail the production build on type errors (good hygiene).
  typescript: { ignoreBuildErrors: false },

  // Surface clearer hydration / strict-mode warnings in dev.
  reactStrictMode: true,

  // Pin the workspace root to this project (a stray parent lockfile exists).
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
