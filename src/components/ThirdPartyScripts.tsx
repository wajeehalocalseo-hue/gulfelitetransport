"use client";

import { useEffect } from "react";

type W = Window & { dataLayer?: unknown[]; clarity?: { (...a: unknown[]): void; q?: unknown[] } };

function add(src: string, attrs: Record<string, string> = {}) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

/**
 * Loads Google Tag Manager, Ahrefs Analytics and Microsoft Clarity after the page has loaded and gone quiet,
 * or at the first tap, scroll or key press, whichever comes first. They no longer compete with the page for
 * the first seconds, which cuts blocking time. Events sent before they load are queued and replayed.
 */
export default function ThirdPartyScripts() {
  useEffect(() => {
    const w = window as W;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    if (!w.clarity) {
      const q: unknown[] = [];
      const stub = function (...a: unknown[]) { q.push(a); } as { (...a: unknown[]): void; q?: unknown[] };
      stub.q = q;
      w.clarity = stub;
    }

    let loaded = false;
    const triggers = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    let timer = 0;
    const load = () => {
      if (loaded) return;
      loaded = true;
      triggers.forEach((t) => window.removeEventListener(t, load));
      window.clearTimeout(timer);
      add("https://www.googletagmanager.com/gtm.js?id=GTM-M6NX327S");
      add("https://analytics.ahrefs.com/analytics.js", { "data-key": "o2Jqnxe9R1hrIxQNqUHPSQ" });
      add("https://www.clarity.ms/tag/zbv8e0hevw");
    };
    triggers.forEach((t) => window.addEventListener(t, load, { once: true, passive: true }));
    const schedule = () => {
      timer = window.setTimeout(load, 3500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      triggers.forEach((t) => window.removeEventListener(t, load));
      window.clearTimeout(timer);
      window.removeEventListener("load", schedule);
    };
  }, []);

  return null;
}