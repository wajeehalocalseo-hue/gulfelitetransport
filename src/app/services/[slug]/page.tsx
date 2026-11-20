import { fitDescription, fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServicePageView from "@/components/ServicePageView";
import { getService, services } from "@/content/services";
import { coverageRegions } from "@/content/services/coverage-regions";
import { getServiceSeo, pageFaqs } from "@/content/services/seo";
import { breadcrumbFor, getNode, pathOf, publishedChildren } from "@/content/taxonomy";
import { pageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const seo = getServiceSeo(slug);
  const title = seo?.metaTitle ?? s.metaTitle;
  const description = seo?.metaDescription ?? s.metaDescription;
  return {
    title: fitTitle(title),
    description: fitDescription(description),
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title, description, url: `/services/${s.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Shown on the taxi page only: where the region, city, area, airport and route pages are. */
function TaxiBlock() {
  return (
    <section id="coverage-saudi" aria-labelledby="coverage-saudi-title" className="mt-14">
      <h2 id="coverage-saudi-title" className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Find your region, city or route</h2>
      <p className="mt-4 text-lg leading-8 text-muted">
        Taxi and cab pages are organised across Saudi Arabia by region, city, area, airport and intercity route. Each page lists real places and what to include in your request.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          ["/taxi-saudi-arabia", "All of Saudi Arabia", "Regions, cities, airports and routes"],
          ["/taxi-saudi-arabia/routes", "Intercity routes", "Riyadh to Jeddah, Dammam to Al Khobar and more"],
          ["/riyadh-taxi-service", "Riyadh", "Capital city rides and airport transfers"],
          ["/taxi-saudi-arabia/makkah-region/jeddah", "Jeddah", "City rides and Jeddah airport transfers"],
        ].map(([href, name, note]) => (
          <li key={href}>
            <Link href={href} className="block h-full rounded-2xl border border-navy/10 bg-white p-4 transition hover:border-accent">
              <span className="font-bold text-navy">{name}</span>
              <span className="mt-1 block text-sm text-muted">{note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  const seo = getServiceSeo(slug);
  if (!s || !seo) notFound();
  const related = s.related.map((r) => services.find((x) => x.slug === r)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const node = getNode(s.slug);
  if (!node) notFound();
  const crumbs = breadcrumbFor(node);
  const subs = publishedChildren(node.id);
  const faq = pageFaqs(s.slug, seo, s.faqs);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: pathOf(node),
          name: seo.metaTitle,
          description: seo.metaDescription,
          crumbs,
          faq,
          service: {
            name: s.title,
            description: seo.directAnswer,
            serviceType: s.title,
            regions: coverageRegions.map((r) => r.name.replace(" (Al Jawf)", "")),
            children: subs.map((k) => ({ name: k.name, path: k.fullUrl })),
          },
        })}
      />
      <ServicePageView
        s={s}
        seo={seo}
        crumbs={crumbs.map((c, i) => (i === crumbs.length - 1 ? { name: c.name } : { name: c.name, href: c.path }))}
        subs={subs}
        related={related}
        taxiBlock={s.slug === "taxi-cab-services" ? <TaxiBlock /> : undefined}
      />
    </>
  );
}
