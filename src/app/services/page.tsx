import type { Metadata } from "next";
import Link from "next/link";
import ContactButtons from "@/components/ContactButtons";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ServiceCard from "@/components/ServiceCard";
import ServiceExplorer from "@/components/ServiceExplorer";
import * as hub from "@/content/hub";
import { groups, services } from "@/content/services";
import { pageGraph } from "@/lib/schema";
import { site, telUrl } from "@/lib/site";

const title = "Transport & Logistics Services for Businesses";
const description =
  "Compare freight and cargo, passenger, equipment moving, fleet, delivery and storage services from Gulf Elite Transport. Quotation before you commit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
  twitter: { card: "summary_large_image", title, description },
};

const eyebrow = "text-sm font-bold uppercase tracking-[0.18em] text-accent";
const h2 = "mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl";
const wrap = "mx-auto max-w-7xl px-5";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";

export default function ServicesPage() {
  const finderRows = hub.selectionGuide.rows
    .map((r) => ({ ...r, service: services.find((s) => s.slug === r.slug) }))
    .filter((r) => r.service);

  const coverage = site.serviceAreas.length
    ? site.serviceAreas.join(", ")
    : "Confirmed on request for each pickup and delivery location";
  const contactBits = [telUrl ? site.phone : "", site.email].filter(Boolean).join(" / ");

  const filters = [
    { id: "all", label: "All services", count: services.length },
    ...groups
      .map((g) => ({ id: g.id, label: g.label, count: services.filter((s) => s.group === g.id).length }))
      .filter((f) => f.count > 0),
  ];
  const cards = services.map((s) => ({ slug: s.slug, group: s.group, node: <ServiceCard s={s} /> }));

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

      {/* Hero with quick enquiry form */}
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        h1="Transport & Logistics Services"
        lead={`${services.length} services for businesses, from freight and cargo to passenger transport, equipment moving and contract fleets, with a clear quotation before you commit.`}
        aside={
          <div id="hero-quote" className="rounded-2xl bg-white p-6 text-navy shadow-2xl sm:p-7">
            <h2 className="text-xl font-extrabold">Get a free quote</h2>
            <p className="mb-5 mt-1 text-sm leading-6 text-muted">
              Tell us what you need and we will reply with a quotation or any questions.
            </p>
            <QuoteForm variant="quick" />
          </div>
        }
      >
        <ul className="mb-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/85">
          {["Quotation before you commit", "Availability confirmed per request", "Recurring arrangements available"].map((t) => (
            <li key={t} className="inline-flex items-center gap-2">
              <Icon name="check" className="h-4 w-4 text-accent" /> {t}
            </li>
          ))}
        </ul>
        <ContactButtons quoteHref="#hero-quote" />
      </PageHero>

      {/* On this page */}
      <nav aria-label="On this page" className="border-b border-navy/10 bg-white">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
          {hub.hubOnPage.map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href}
                className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-navy ring-1 ring-navy/15 hover:bg-accent hover:ring-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Direct answer (AEO) */}
      <section id="answer" aria-labelledby="answer-title" className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center">
          <h2 id="answer-title" className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{hub.hubAnswer.h2}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{hub.hubAnswer.answer}</p>
        </div>
      </section>

      {/* Service explorer */}
      <section id="services" aria-labelledby="services-title" className={`${wrap} py-16`}>
        <p className={eyebrow}>All services</p>
        <h2 id="services-title" className={h2}>Choose the service you need</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{hub.groupsIntro.text}</p>
        <div className="mt-8">
          <ServiceExplorer filters={filters} cards={cards} />
        </div>
      </section>

      {/* Service finder */}
      <section id="guide" aria-labelledby="guide-title" className="bg-navy py-16 text-white">
        <div className={wrap}>
          <p className={eyebrow}>Service finder</p>
          <h2 id="guide-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{hub.selectionGuide.h2}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{hub.selectionGuide.text}</p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {finderRows.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full items-start gap-4 rounded-xl bg-navy-2 p-5 ring-1 ring-white/10 transition hover:ring-accent"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-navy">
                    <Icon name={r.service?.icon ?? "check"} />
                  </span>
                  <span>
                    <span className="block text-sm leading-6 text-white/75">{r.need}</span>
                    <span className="mt-1 inline-flex items-center gap-1.5 font-bold text-accent">
                      {r.service?.title}
                      <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-navy-2 p-6 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-extrabold">{hub.midCta.h2}</h3>
              <p className="mt-1 text-white/75">{hub.midCta.text}</p>
            </div>
            <ContactButtons quoteHref="#quote" />
          </div>
        </div>
      </section>

      {/* Overview: audience, categories, facts */}
      <section aria-labelledby="overview-title" className={`${wrap} grid gap-10 py-16 lg:grid-cols-[1.3fr_0.7fr]`}>
        <div>
          <p className={eyebrow}>Overview</p>
          <h2 id="overview-title" className={h2}>{hub.hubAudience.h2}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{hub.hubAudience.answer}</p>
          <p className="mt-4 leading-8 text-muted">{hub.hubAnswer.more}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {groups.map((g) => {
              const list = services.filter((s) => s.group === g.id);
              if (!list.length) return null;
              return (
                <article key={g.id} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <h3 className="font-extrabold text-navy">{g.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{g.text}</p>
                  <ul className="mt-3 space-y-1">
                    {list.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className={`${textLink} text-sm`}>{s.title}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
        <aside aria-labelledby="facts-title" className="h-fit rounded-2xl bg-navy p-6 text-white sm:p-7 lg:sticky lg:top-24">
          <h2 id="facts-title" className="text-xl font-extrabold text-accent">{hub.hubFacts.h2}</h2>
          <dl className="mt-5 space-y-4 text-sm">
            {hub.hubFacts.rows.map((r) => (
              <div key={r.label}>
                <dt className="font-bold text-white">{r.label}</dt>
                <dd className="mt-1 leading-6 text-white/75">{r.value}</dd>
              </div>
            ))}
            <div>
              <dt className="font-bold text-white">Coverage</dt>
              <dd className="mt-1 leading-6 text-white/75">{coverage}</dd>
            </div>
            {contactBits && (
              <div>
                <dt className="font-bold text-white">Direct contact</dt>
                <dd className="mt-1 leading-6 text-white/75">{contactBits}</dd>
              </div>
            )}
          </dl>
        </aside>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="bg-white py-16">
        <div className={wrap}>
          <h2 id="process-title" className="text-3xl font-extrabold tracking-tight text-navy">{hub.hubProcess.h2}</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {hub.hubProcess.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-navy/10 bg-surface p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries */}
      <section aria-labelledby="industries-title" className={`${wrap} py-16`}>
        <h2 id="industries-title" className="text-3xl font-extrabold tracking-tight text-navy">{hub.hubIndustries.h2}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{hub.hubIndustries.text}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hub.hubIndustries.items.map((i) => (
            <li key={i.title} className="rounded-xl border border-navy/10 bg-white p-5">
              <h3 className="font-bold text-navy">{i.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{i.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison (collapsed by default to keep the page light) */}
      <section id="compare" aria-labelledby="compare-title" className="bg-white py-16">
        <div className={wrap}>
          <p className={eyebrow}>Compare</p>
          <h2 id="compare-title" className={h2}>Compare our transport services</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            A side-by-side view of what each service covers, who it suits and what we ask for when
            preparing your quotation.
          </p>
          <details className="group mt-8 rounded-2xl border border-navy/10 bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-navy">
              Show the comparison table ({services.length} services)
              <Icon name="chevron" className="h-5 w-5 text-accent transition-transform group-open:rotate-180" />
            </summary>
            <div className="overflow-hidden border-t border-navy/10">
              <table className="w-full border-collapse text-left text-sm max-md:block">
                <caption className="sr-only">Comparison of Gulf Elite Transport services</caption>
                <thead className="bg-navy text-white max-md:sr-only">
                  <tr>
                    <th scope="col" className="p-4 font-bold">Service</th>
                    <th scope="col" className="p-4 font-bold">Best for</th>
                    <th scope="col" className="p-4 font-bold">What it covers</th>
                    <th scope="col" className="p-4 font-bold text-accent">What we ask for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10 bg-white max-md:block">
                  {services.map((s) => (
                    <tr key={s.slug} className="align-top max-md:block max-md:p-5">
                      <th scope="row" className="p-4 font-bold text-navy max-md:block max-md:p-0 max-md:pb-2 max-md:text-base">
                        <Link href={`/services/${s.slug}`} className={textLink}>{s.title}</Link>
                      </th>
                      {[
                        ["Best for", s.audienceShort],
                        ["What it covers", s.includes.slice(0, 3).map((i) => i.title).join("; ")],
                        ["What we ask for", s.quoteInfo.slice(0, 3).join("; ")],
                      ].map(([label, value]) => (
                        <td
                          key={label}
                          data-label={label}
                          className="p-4 leading-6 text-muted before:mb-0.5 before:block before:text-xs before:font-bold before:uppercase before:tracking-wider before:text-navy before:content-[attr(data-label)] max-md:block max-md:px-0 max-md:py-1.5 md:before:hidden"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </section>

      {/* Quotation, pricing and availability */}
      <section id="quotation" aria-labelledby="quotation-title" className={`${wrap} py-16`}>
        <p className={eyebrow}>Before you request</p>
        <h2 id="quotation-title" className={h2}>{hub.hubQuotation.h2}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{hub.hubQuotation.text}</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-lg font-extrabold text-navy">{hub.hubQuotation.info.q}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{hub.hubQuotation.info.a}</p>
            <ul className="mt-4 space-y-1.5">
              {hub.hubQuotation.info.list.map((i) => (
                <li key={i} className="flex gap-2 text-sm text-navy">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-lg font-extrabold text-navy">{hub.hubQuotation.pricing.q}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{hub.hubQuotation.pricing.a}</p>
            <ul className="mt-4 space-y-1.5">
              {hub.pricingFactors.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-navy">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-6 text-muted">Each service page lists the factors specific to that service.</p>
          </article>
          <article className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-lg font-extrabold text-navy">{hub.hubQuotation.availability.q}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{hub.hubQuotation.availability.a}</p>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-navy marker:font-bold marker:text-accent">
              {hub.hubQuotation.availability.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-5">
          <p className={eyebrow}>FAQ</p>
          <h2 id="faq-title" className={h2}>Transport services: frequently asked questions</h2>
          <div className="mt-8">
            <FaqList items={hub.hubFaqs} />
          </div>
          <h3 className="mt-12 text-2xl font-extrabold tracking-tight text-navy">What each service means</h3>
          <p className="mt-2 text-muted">Short answers for each service. The service pages go into more detail.</p>
          <div className="mt-6">
            <FaqList
              items={services
                .map((s) => hub.hubQa[s.slug])
                .filter(Boolean)
                .map((qa) => ({ q: qa.q, a: qa.a }))}
            />
          </div>
        </div>
      </section>

      {/* Full quote form */}
      <section id="quote" aria-labelledby="quote-title" className="bg-navy text-white">
        <div className={`${wrap} grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]`}>
          <div>
            <h2 id="quote-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Request a free quote</h2>
            <p className="mt-4 text-lg leading-8 text-white/75">
              Tell us what you need to move and we will respond with a quotation or the questions
              we need answered. Learn more{" "}
              <Link href="/about" className="font-bold text-accent underline underline-offset-4">about us</Link> or{" "}
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
