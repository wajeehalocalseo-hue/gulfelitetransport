import type { PlacePage } from "@/content/saudi/types";
import { pageGraph } from "./schema";

const wikiUrl = (title: string) => `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;

const entityNode = (e: PlacePage["entities"][number]) => {
  const base: Record<string, unknown> = { "@type": e.type === "Airport" ? "Airport" : e.type === "Place" ? "Place" : e.type, name: e.name };
  if (e.wiki) base.sameAs = wikiUrl(e.wiki);
  if (e.iata) base.iataCode = e.iata;
  return base;
};

/**
 * WebPage + BreadcrumbList + Service for a Saudi taxi page. The Service names the places it applies to
 * (areaServed) so search and AI systems can tie the page to those real-world entities. It contains no prices,
 * ratings, reviews or availability claims.
 */
export function placeGraph(page: PlacePage) {
  const graph = pageGraph({
    path: page.path,
    name: page.title,
    description: page.description,
    type: page.kind === "hub" || page.kind === "region" ? "CollectionPage" : "WebPage",
    crumbs: page.crumbs,
    service: {
      name: `Taxi and cab rides: ${page.name}`,
      description: page.directAnswer,
      serviceType: "Taxi and cab service",
      parentPath: "/services/taxi-cab-services",
      children: page.children,
    },
  });
  const nodes = graph["@graph"] as Record<string, unknown>[];
  const service = nodes.find((n) => n["@type"] === "Service");
  if (service) service.areaServed = page.entities.map(entityNode);
  return graph;
}
