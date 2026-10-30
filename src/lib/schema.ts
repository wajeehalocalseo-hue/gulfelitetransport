import { services } from "@/content/services";
import { abs, site } from "./site";

/**
 * Entity model (stable @ids):
 *   Organization (/#organization)
 *     |- hasOfferCatalog -> Service (<page>#service) for each published service
 *   WebSite (/#website) -> publisher Organization
 *   WebPage (<page>#webpage) -> isPartOf WebSite, about Organization,
 *                               breadcrumb BreadcrumbList, mainEntity Service / ItemList
 *   Service (<page>#service) -> provider Organization
 */
const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;

const description =
  "Gulf Elite Transport provides freight and cargo transport, passenger transport, equipment and machinery moving, and contract fleet services for businesses.";

/** Organization + WebSite. Rendered once, in the root layout. No unverified data is included. */
export const baseGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      url: site.url,
      description,
      ...(site.email || site.phone
        ? {
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              ...(site.phone ? { telephone: site.phone } : {}),
              ...(site.email ? { email: site.email } : {}),
            },
          }
        : {}),
      ...(site.address && site.country
        ? { address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: site.country } }
        : {}),
      ...(site.socialProfiles.length ? { sameAs: [...site.socialProfiles] } : {}),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${site.name} services`,
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@id": `${abs(`/services/${s.slug}`)}#service` },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: site.url,
      name: site.name,
      publisher: { "@id": orgId },
      inLanguage: site.language,
    },
  ],
};

type PageOpts = {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  crumbs?: { name: string; path: string }[];
  service?: { name: string; description: string; serviceType: string };
  items?: { name: string; path: string }[];
};

/** Per-page WebPage (or subtype), optional Service, ItemList and BreadcrumbList, all linked by @id. */
export function pageGraph(o: PageOpts) {
  const url = abs(o.path);
  const pageId = `${url}#webpage`;
  const page: Record<string, unknown> = {
    "@type": o.type ?? "WebPage",
    "@id": pageId,
    url,
    name: o.name,
    description: o.description,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    inLanguage: site.language,
  };
  const graph: object[] = [page];

  if (o.crumbs?.length) {
    page.breadcrumb = { "@id": `${url}#breadcrumb` };
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: o.crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: abs(c.path),
      })),
    });
  }
  if (o.items?.length) {
    page.mainEntity = { "@id": `${url}#services` };
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#services`,
      itemListElement: o.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: abs(it.path),
        item: { "@id": `${abs(it.path)}#service` },
      })),
    });
  }
  if (o.service) {
    page.mainEntity = { "@id": `${url}#service` };
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: o.service.name,
      description: o.service.description,
      serviceType: o.service.serviceType,
      url,
      mainEntityOfPage: { "@id": pageId },
      provider: { "@id": orgId },
      ...(site.serviceAreas.length
        ? { areaServed: site.serviceAreas.map((a) => ({ "@type": "Place", name: a })) }
        : {}),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
