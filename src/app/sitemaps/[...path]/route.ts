import { entriesFor, sitemapIds, urlsetXml } from "@/lib/sitemaps";

export const dynamic = "force-static";
export const dynamicParams = false;

/** Serves /sitemaps/<id>.xml for each sitemap id (the last segment keeps its .xml ending). */
export function generateStaticParams() {
  return sitemapIds.map((id) => ({ path: [`${id}.xml`] }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const id = (path[0] ?? "").replace(/\.xml$/, "");
  const entries = entriesFor(id);
  if (!entries) return new Response("Not found", { status: 404 });
  return new Response(urlsetXml(entries), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}