"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An embedded map that only loads when it is about to scroll into view. The map is a heavy third-party page,
 * so loading it on arrival slows the whole page down.
 */
export default function LazyMap({ title, src, className = "" }: { title: string; src: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`${className} bg-surface`}>
      {show ? (
        <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-muted">Map loads as you scroll</div>
      )}
    </div>
  );
}