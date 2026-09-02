import type { NextConfig } from "next";
import path from "node:path";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this project so Next.js ignores the stray
  // package-lock.json in the home directory and stops warning about it.
  turbopack: {
    root: path.resolve(__dirname),
  },

  async headers() {
    // In dev, Turbopack chunk filenames are path-based and stay stable across
    // edits, so a browser can re-serve a cached chunk that still holds old
    // code. That produces hydration mismatches where the server HTML is
    // current but the client bundle is stale. Telling the browser not to
    // store dev assets keeps the two in sync.
    if (!isDev) return [];

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;
