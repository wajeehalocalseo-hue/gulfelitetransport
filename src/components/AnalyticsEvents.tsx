"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Reports taps on WhatsApp, phone and email links, which are the other ways a visitor contacts us. */
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href") ?? "";
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\b/i.test(href)) track("whatsapp_click", { link_url: href.split("?")[0] });
      else if (href.startsWith("tel:")) track("phone_click");
      else if (href.startsWith("mailto:")) track("email_click");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
