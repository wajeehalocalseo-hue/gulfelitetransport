import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactButtons from "@/components/ContactButtons";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ServiceArt from "@/components/ServiceArt";
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
    twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription },
  };
}

const h2 = "text-2xl font-extrabold tracking-tight text-navy sm:text-3xl";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((a) => (
        <li key={a} className="flex gap-3 leading-7 text-muted">
          <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" /> {a}
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = s.related
    .map((r) => services.find((x) => x.slug === r))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

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
        aside={
          <ServiceArt
            icon={s.icon}
            slug={s.slug}
            title={s.title}
            className="hidden aspect-[4/3] rounded-2xl ring-1 ring-white/10 lg:flex"
          />
        }
      >
        <ContactButtons service={s.title} />
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.45fr_1fr]">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="answer">
            <h2 id="answer" className="sr-only">Summary</h2>
            <p className="rounded-2xl border-l-4 border-accent bg-white p-6 text-lg font-medium leading-8 text-navy">
              {s.directAnswer}
            </p>
          </section>

          <section aria-labelledby="overview">
            <h2 id="overview" className={h2}>{s.title} overview</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
              {s.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="included">
            <h2 id="included" className={h2}>What {s.title.toLowerCase()} includes</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.includes.map((i) => (
                <article key={i.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <h3 className="font-bold text-navy">{i.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted">{i.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="how">
            <h2 id="how" className={h2}>How the service works</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.steps.map((st, i) => (
                <li key={st.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-navy">{st.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted">{st.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="audience">
            <h2 id="audience" className={h2}>Who needs this service</h2>
            <Checklist items={s.audience} />
          </section>

          <section aria-labelledby="usecases">
            <h2 id="usecases" className={h2}>Industries and use cases</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.useCases.map((u) => (
                <article key={u.title} className="rounded-2xl bg-navy p-5 text-white">
                  <h3 className="font-bold text-accent">{u.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-white/80">{u.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="considerations">
            <h2 id="considerations" className={h2}>Planning considerations</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              A few points make the biggest difference to how smoothly this service runs. Thinking
              about them before you send your request leads to a faster and more accurate quotation.
            </p>
            <dl className="mt-6 space-y-4">
              {s.considerations.map((c) => (
                <div key={c.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <dt className="font-bold text-navy">{c.title}</dt>
                  <dd className="mt-1.5 text-sm leading-7 text-muted">{c.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="info">
            <h2 id="info" className={h2}>Information we need for a quotation</h2>
            <p className="mt-4 text-lg leading-8 text-muted">The more precisely you describe the requirement, the faster we can assess it. Please include:</p>
            <Checklist items={s.quoteInfo} />
            <h3 className="mt-8 text-xl font-bold text-navy">What affects the quotation?</h3>
            <Checklist items={s.quoteFactors} />
            <p className="mt-6 text-muted">
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
            <h2 id="related" className={h2}>Related services</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((o) => (
                <li key={o.slug} className="rounded-xl border border-navy/10 bg-white p-4">
                  <Link href={`/services/${o.slug}`} className={textLink}>{o.title}</Link>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{o.short}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">
              See all <Link href="/services" className={textLink}>transport services</Link>, read{" "}
              <Link href="/about" className={textLink}>about Gulf Elite Transport</Link> or{" "}
              <Link href="/contact" className={textLink}>contact the team</Link>.
            </p>
          </section>
        </div>

        <aside
          id="quote"
          aria-labelledby="quote-title"
          className="h-fit rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-24"
        >
          <h2 id="quote-title" className="text-xl font-extrabold text-navy">
            Request a {s.title} quote
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Just have a question first?{" "}
            <Link href="/contact" className={textLink}>
              Request service information
            </Link>
            .
          </p>
          <div className="mt-5">
            <QuoteForm defaultService={s.title} />
          </div>
        </aside>
      </div>
    </main>
  );
}
