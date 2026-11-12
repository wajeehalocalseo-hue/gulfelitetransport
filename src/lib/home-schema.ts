import { faqs } from "@/content/home";
import { regions } from "@/content/saudi/regions";
import { services } from "@/content/services";
import { pageGraph } from "./schema";
import { abs, site } from "./site";

const orgId = `${site.url}/#organization`;
const countryId = `${site.url}/#saudi-arabia`;
const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export const homeTitle = "Gulf Elite Transport | Taxi, Cab, Freight & Passenger Transport in Saudi Arabia";
export const homeDescription =
  "Request taxi and cab rides in Saudi cities, airport transfers and intercity trips, or arrange freight, cargo and fleet services. Fare confirmed before you commit.";

/**
 * Home page graph: WebPage (with speakable answer block) -> ItemList of services, a taxi Service whose
 * areaServed is the country and its regions (entities), and a FAQPage built from the visible FAQ.
 * Only facts shown on the page are marked up; no ratings, prices or reviews.
 */
export function homeGraph() {
  const base = pageGraph({
    path: "/",
    name: homeTitle,
    description: homeDescription,
    items: services.map((s) => ({ name: s.title, path: `/services/${s.slug}` })),
  });
  const graph = base["@graph"] as Record<string, unknown>[];
  const page = graph.find((g) => g["@type"] === "WebPage");
  if (page) {
    page.speakable = { "@type": "SpeakableSpecification", cssSelector: ["#answer-title", "#answer-text"] };
    page.mentions = [{ "@id": countryId }];
  }

  graph.push(
    {
      "@type": "Country",
      "@id": countryId,
      name: "Saudi Arabia",
      alternateName: "المملكة العربية السعودية",
      sameAs: ["https://en.wikipedia.org/wiki/Saudi_Arabia", "https://www.wikidata.org/wiki/Q851"],
    },
    {
      "@type": "Service",
      "@id": `${site.url}/#taxi-service`,
      name: "Taxi and cab rides in Saudi Arabia",
      serviceType: "Taxi and cab service",
      description:
        "Taxi and cab rides, airport transfers and intercity trips across Saudi Arabia, organised by region, city, airport and route. Vehicle, driver and fare are confirmed before you commit.",
      url: abs("/services/taxi-cab-services"),
      provider: { "@id": orgId },
      areaServed: [
        { "@id": countryId },
        ...regions.map((r) => ({ "@type": "AdministrativeArea", name: r.name, containedInPlace: { "@id": countryId } })),
      ],
      availableChannel: { "@type": "ServiceChannel", serviceUrl: abs("/#hero-quote"), name: "Online ride request form" },
    },
    {
      "@type": "FAQPage",
      "@id": `${abs("/")}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
      })),
    },
  );
  return base;
}
