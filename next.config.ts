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
    // store the dev *assets* keeps the two in sync.
    //
    // Scope this to /_next/* only. Applying no-store to the page HTML as well
    // made ordinary reloads re-serve a stale document, so a hard refresh was
    // needed to see edits. Leaving the HTML to revalidate normally lets HMR and
    // a plain reload pick up changes immediately.
    if (!isDev) return [];

    return [
      // Static dev assets: never store, so a rebuilt chunk is always re-fetched.
      {
        source: "/_next/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      // Page HTML (everything that is not a /_next asset): force the browser to
      // revalidate with the server on every load instead of reusing a cached or
      // bfcache copy. This is what lets a normal reload show edits without a
      // hard refresh.
      {
        source: "/:path*",
        missing: [{ type: "query", key: "_rsc" }],
        headers: [
          { key: "Cache-Control", value: "no-cache, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
