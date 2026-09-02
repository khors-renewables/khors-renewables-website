"use client";

import { useEffect, useState } from "react";

export default function ScreenSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (size.w === 0) return null;

  return (
    <div className="fixed bottom-2 left-2 z-[9999] rounded bg-black/80 px-3 py-1.5 font-mono text-[13px] text-white shadow-lg">
      {size.w} × {size.h}
    </div>
  );
}
