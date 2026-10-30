import type { Metadata } from "next";
import Link from "next/link";
import ContactButtons from "@/components/ContactButtons";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ServiceArt from "@/components/ServiceArt";
import * as hub from "@/content/hub";
import { groups, services } from "@/content/services";
import { pageGraph } from "@/lib/schema";

const title = "Transport & Logistics Services";
const description =
  "Explore Gulf Elite Transport services: freight and cargo, passenger transport, equipment and machinery moving, contract fleet and more. Request a free quotation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

const eyebrow = "text-sm font-bold uppercase tracking-[0.18em] text-accent";
const h2 = "mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl";
const wrap = "mx-auto max-w-7xl px-5";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";

export default function ServicesPage() {
  const guideRows = hub.selectionGuide.rows
    .map((r) => ({ ...r, service: services.find((s) => s.slug === r.slug) }))
    .filter((r) => r.service);

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/services",
          name: title,
          description,
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ],
          items: services.map((s) => ({ name: s.title, path: `/services/${s.slug}` })),
        })}
      />

      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        h1="Transport & Logistics Services"
        lead="Coordinated transport for businesses that need to move goods, people and equipment, with a clear quotation before you commit."
      >
        <ContactButtons quoteHref="#quote" />
      </PageHero>

      {/* Intro */}
      <section aria-labelledby="intro-title" className={`${wrap} grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <p className={eyebrow}>Our services</p>
          <h2 id="intro-title" className={h2}>{hub.hubIntro.h2}</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-muted">
          {hub.hubIntro.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {/* Featured (only when there are more services than a single grid needs) */}
      {services.length > 4 && (
        <section aria-labelledby="featured-title" className="bg-white py-16">
          <div className={wrap}>
            <p className={eyebrow}>Most requested</p>
            <h2 id="featured-title" className={h2}>Featured services</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex h-full items-center gap-4 rounded-2xl border border-navy/10 bg-surface p-5 font-bold text-navy transition hover:border-accent"
                  >
                    <Icon name={s.icon} className="h-8 w-8 shrink-0 text-accent" /> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* All services */}
      <section id="all-services" aria-labelledby="all-title" className={`${wrap} py-16`}>
        <p className={eyebrow}>All services</p>
        <h2 id="all-title" className={h2}>Choose the service you need</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white transition hover:shadow-lg"
            >
              <ServiceArt icon={s.icon} slug={s.slug} title={s.title} className="aspect-[16/8]" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold text-navy">{s.title}</h3>
                <p className="mt-2 leading-7 text-muted">{s.short}</p>
                <p className="mt-3 text-sm font-semibold text-navy">
                  <span className="text-muted">Best for: </span>
                  {s.audienceShort}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-navy">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
                  <Link href={`/services/${s.slug}`} className={textLink}>
                    Learn more
                  </Link>
                  <Link
                    href={`/services/${s.slug}#quote`}
                    className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-navy hover:brightness-95"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Solution groups */}
      {groups.map((g) => {
        const list = services.filter((s) => s.group === g.id);
        if (!list.length) return null;
        return (
          <section key={g.id} aria-labelledby={`${g.id}-title`} className={g.id === "passenger" || g.id === "fleet" ? "bg-white py-16" : "py-16"}>
            <div className={wrap}>
              <h2 id={`${g.id}-title`} className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{g.title}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{g.text}</p>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {list.map((s) => (
                  <li key={s.slug} className="rounded-xl border border-navy/10 bg-surface p-5">
                    <Link href={`/services/${s.slug}`} className={textLink}>{s.title}</Link>
                    <p className="mt-2 text-sm leading-7 text-muted">{s.short}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* Industries */}
      <section aria-labelledby="industries-title" className="bg-navy py-16 text-white">
        <div className={wrap}>
          <h2 id="industries-title" className="text-3xl font-extrabold tracking-tight">{hub.hubIndustries.h2}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{hub.hubIndustries.text}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hub.hubIndustries.items.map((i) => (
              <li key={i.title} className="rounded-xl bg-navy-2 p-5 ring-1 ring-white/10">
                <h3 className="font-bold text-accent">{i.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">{i.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className={`${wrap} py-16`}>
        <h2 id="process-title" className="text-3xl font-extrabold tracking-tight text-navy">{hub.hubProcess.h2}</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-4">
          {hub.hubProcess.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-navy/10 bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
              <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why choose */}
      <section aria-labelledby="why-title" className="bg-white py-16">
        <div className={wrap}>
          <h2 id="why-title" className="text-3xl font-extrabold tracking-tight text-navy">{hub.hubWhy.h2}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {hub.hubWhy.items.map((w) => (
              <li key={w} className="flex gap-3 rounded-xl border border-navy/10 bg-surface p-5 text-navy">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selection guide */}
      <section aria-labelledby="guide-title" className={`${wrap} py-16`}>
        <h2 id="guide-title" className="text-3xl font-extrabold tracking-tight text-navy">{hub.selectionGuide.h2}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{hub.selectionGuide.text}</p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <caption className="sr-only">Service selection guide</caption>
            <thead className="bg-navy text-white">
              <tr>
                <th scope="col" className="p-4 font-bold">If you need to&hellip;</th>
                <th scope="col" className="p-4 font-bold text-accent">Look at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {guideRows.map((r) => (
                <tr key={r.slug}>
                  <td className="p-4 leading-6 text-muted">{r.need}</td>
                  <td className="p-4">
                    <Link href={`/services/${r.slug}`} className={textLink}>{r.service?.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-5">
          <h2 id="faq-title" className="text-3xl font-extrabold tracking-tight text-navy">Services: frequently asked questions</h2>
          <div className="mt-8">
            <FaqList items={hub.hubFaqs} />
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section id="quote" aria-labelledby="quote-title" className="bg-navy text-white">
        <div className={`${wrap} grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]`}>
          <div>
            <h2 id="quote-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Request a free quote</h2>
            <p className="mt-4 text-lg leading-8 text-white/75">
              Tell us what you need to move and we will respond with a quotation or the questions
              we need answered. Learn more <Link href="/about" className="font-bold text-accent underline underline-offset-4">about us</Link> or{" "}
              <Link href="/contact" className="font-bold text-accent underline underline-offset-4">contact the team</Link>.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-navy sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
