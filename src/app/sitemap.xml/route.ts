import { indexXml } from "@/lib/sitemaps";

export const dynamic = "force-static";

/** Sitemap index: lists the separate sitemaps for pages, services, the taxi hub and each city. */
export function GET() {
  return new Response(indexXml(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}