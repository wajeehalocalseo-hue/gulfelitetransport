import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { getService, services } from "@/content/services";
import { pageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/services/${s.slug}` },
  };
}

const h2 = "text-2xl font-extrabold tracking-tight text-navy sm:text-3xl";

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: `/services/${s.slug}`,
          name: s.metaTitle,
          description: s.metaDescription,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.title, path: `/services/${s.slug}` },
          ],
          service: { name: s.title, description: s.metaDescription, serviceType: s.title },
        })}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.title }]}
        h1={s.h1}
        lead={s.lead}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-14">
          <section aria-labelledby="overview">
            <h2 id="overview" className={h2}>Overview</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
              {s.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="included">
            <h2 id="included" className={h2}>What this service covers</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.includes.map((i) => (
                <article key={i.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <h3 className="font-bold text-navy">{i.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted">{i.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="audience">
            <h2 id="audience" className={h2}>Who this service is for</h2>
            <ul className="mt-5 space-y-3">
              {s.audience.map((a) => (
                <li key={a} className="flex gap-3 leading-7 text-muted">
                  <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" /> {a}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="info">
            <h2 id="info" className={h2}>What we need for a quotation</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              The more precisely you describe the requirement, the faster we can assess it. Please
              include:
            </p>
            <ul className="mt-4 space-y-3">
              {s.quoteInfo.map((q) => (
                <li key={q} className="flex gap-3 leading-7 text-muted">
                  <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" /> {q}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-muted">
              Availability depends on your locations and dates. We confirm it with you before any
              arrangement is made.
            </p>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className={h2}>{s.title}: frequently asked questions</h2>
            <div className="mt-6">
              <FaqList items={s.faqs} />
            </div>
          </section>

          <section aria-labelledby="related">
            <h2 id="related" className={h2}>Other services</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="block rounded-xl border border-navy/10 bg-white p-4 font-semibold text-navy hover:border-accent"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside id="quote" aria-labelledby="quote-title" className="h-fit rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 id="quote-title" className="text-xl font-extrabold text-navy">
            Request a {s.title} quote
          </h2>
          <div className="mt-5">
            <QuoteForm defaultService={s.title} />
          </div>
        </aside>
      </div>
    </main>
  );
}
