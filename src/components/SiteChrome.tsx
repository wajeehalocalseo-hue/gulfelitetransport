"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides public-site chrome (header, footer, sticky bar, analytics) on the private /admin pages. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "";
  if (path === "/admin" || path.startsWith("/admin/")) return null;
  return <>{children}</>;
}
