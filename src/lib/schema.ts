import { abs, site } from "./site";

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
  /** Visible FAQ content on the page; emitted as FAQPage (valid markup, no Google rich result for most commercial sites). */
  faqs?: { q: string; a: string }[];
};

/** Per-page WebPage (or subtype), optional Service and BreadcrumbList; links to the base entities by @id. */
export function pageGraph(o: PageOpts) {
  const url = abs(o.path);
  const pageId = `${url}#webpage`;
  const graph: object[] = [
    {
      "@type": o.type ?? "WebPage",
      "@id": pageId,
      url,
      name: o.name,
      description: o.description,
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
      inLanguage: site.language,
    },
  ];
  if (o.crumbs?.length) {
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
  if (o.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      isPartOf: { "@id": pageId },
      mainEntity: o.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  if (o.service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: o.service.name,
      description: o.service.description,
      serviceType: o.service.serviceType,
      url,
      provider: { "@id": orgId },
      ...(site.serviceAreas.length
        ? { areaServed: site.serviceAreas.map((a) => ({ "@type": "Place", name: a })) }
        : {}),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
