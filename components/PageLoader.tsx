"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Full-screen loading overlay: the Khors logo with a spinning ring around it.
 * Shows on first mount, then fades out once the window `load` event fires
 * (so hero images are ready) with a small minimum display time so it doesn't
 * flash on fast loads. Unmounts after the fade so it never blocks clicks.
 */
const SESSION_KEY = "khors:loaderShown";

export default function PageLoader() {
  // Server and first client render always agree (overlay visible) to avoid a
  // hydration mismatch. An effect below removes it instantly if it already ran
  // this browser session — which is what silences the dev hot-reload re-flash,
  // since each save remounts the component but sessionStorage persists.
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Already shown this session (hot-reload, client nav, back/forward): skip
    // the animation entirely and unmount on the next tick.
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
      setRemoved(true);
      return;
    }

    const mountedAt = Date.now();
    const MIN_MS = 600;

    const finish = () => {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      const elapsed = Date.now() - mountedAt;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => setHidden(true), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // Safety net in case `load` never fires (cached/edge cases).
      const fallback = window.setTimeout(finish, 4000);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(fallback);
      };
    }
  }, []);

  // Drop from the DOM after the fade-out transition completes.
  useEffect(() => {
    if (!hidden) return;
    const t = window.setTimeout(() => setRemoved(true), 500);
    return () => window.clearTimeout(t);
  }, [hidden]);

  useEffect(() => {
    // Lock scroll while the loader is visible.
    if (removed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [removed]);

  if (removed) return null;

  return (
    <div
      aria-hidden={hidden}
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-[9rem] w-[9rem] items-center justify-center">
        {/* Spinning ring */}
        <span className="absolute inset-0 rounded-full border-[0.25rem] border-navy/10 border-t-brand border-r-brand-leaf animate-spin [animation-duration:0.9s]" />

        {/* Logo */}
        <Image
          src="/_archive/khors-logo.png"
          alt="Khors Renewables"
          width={120}
          height={120}
          priority
          className="h-[6rem] w-[6rem] object-contain"
        />
      </div>

      <span className="sr-only">Loading</span>
    </div>
  );
}
