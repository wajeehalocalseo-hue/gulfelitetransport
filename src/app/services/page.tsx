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
import { site, telUrl } from "@/lib/site";

const title = "Freight, Passenger, Equipment & Fleet Transport Services";
const description =
  "Compare Gulf Elite Transport services: freight and cargo, passenger transport, equipment and machinery moving and contract fleet. See what each covers and request a free quote.";

export const metadata: Metadata = {
  title: "Freight, Passenger & Fleet Transport Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
  twitter: { card: "summary_large_image", title, description },
};

const eyebrow = "text-sm font-bold uppercase tracking-[0.18em] text-accent";
const h2 = "mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl";
const wrap = "mx-auto max-w-7xl px-5";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";
const chip = "rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy ring-1 ring-navy/10";

export default function ServicesPage() {
  const guideRows = hub.selectionGuide.rows
    .map((r) => ({ ...r, service: services.find((s) => s.slug === r.slug) }))
    .filter((r) => r.service);

  const coverage = site.serviceAreas.length
    ? site.serviceAreas.join(", ")
    : "Confirmed on request for each pickup and delivery location";
  const contactBits = [telUrl ? site.phone : "", site.email].filter(Boolean).join(" / ");

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
          faqs: hub.hubFaqs,
        })}
      />

      {/* Hero with quick enquiry form */}
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        h1="Transport & Logistics Services"
        lead="Freight and cargo, passenger transport, equipment and machinery moving, and contract fleet services for businesses, with a clear quotation before you commit."
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
          {[`${services.length} service categories`, "Quotation before you commit", "Availability confirmed per request"].map((t) => (
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

      {/* Direct answer + key facts (AEO / GEO) */}
      <section id="answer" aria-labelledby="answer-title" className={`${wrap} grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr]`}>
        <div>
          <p className={eyebrow}>Our services</p>
          <h2 id="answer-title" className={h2}>{hub.hubAnswer.h2}</h2>
          <p className="mt-5 text-lg font-medium leading-8 text-navy">{hub.hubAnswer.answer}</p>
          <p className="mt-4 leading-8 text-muted">{hub.hubAnswer.more}</p>
          <dl className="mt-8 space-y-4">
            {services.map((s) => (
              <div key={s.slug} className="rounded-xl border border-navy/10 bg-white p-4">
                <dt>
                  <Link href={`/services/${s.slug}`} className={textLink}>{s.title}</Link>
                </dt>
                <dd className="mt-1.5 text-sm leading-7 text-muted">{s.short}</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside aria-labelledby="facts-title" className="h-fit rounded-2xl bg-navy p-6 text-white sm:p-7 lg:sticky lg:top-24">
          <h2 id="facts-title" className="text-xl font-extrabold text-accent">{hub.hubFacts.h2}</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-bold text-white">Service categories</dt>
              <dd className="mt-1 leading-6 text-white/75">{services.map((s) => s.title).join(", ")}</dd>
            </div>
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

      {/* Services by group */}
      <section id="services" aria-labelledby="services-title" className="bg-white py-16">
        <div className={wrap}>
          <p className={eyebrow}>Services</p>
          <h2 id="services-title" className={h2}>{hub.groupsIntro.h2}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{hub.groupsIntro.text}</p>

          <div className="mt-12 space-y-14">
            {groups.map((g) => {
              const list = services.filter((s) => s.group === g.id);
              if (!list.length) return null;
              return (
                <div key={g.id} className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-navy">{g.title}</h3>
                    <p className="mt-3 leading-8 text-muted">{g.text}</p>
                  </div>
                  <div className="space-y-5">
                    {list.map((s) => (
                      <article
                        key={s.slug}
                        className="flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-surface transition hover:shadow-lg md:flex-row"
                      >
                        <ServiceArt
                          icon={s.icon}
                          slug={s.slug}
                          title={s.title}
                          className="aspect-[16/7] md:aspect-auto md:w-52 md:shrink-0"
                        />
                        <div className="flex flex-1 flex-col p-6">
                          <h4 className="text-xl font-extrabold text-navy">{s.title}</h4>
                          <p className="mt-2 leading-7 text-muted">{s.short}</p>
                          <p className="mt-3 text-sm font-semibold text-navy">
                            <span className="font-medium text-muted">Best for: </span>
                            {s.audienceShort}
                          </p>
                          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">What it covers</p>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {s.includes.slice(0, 4).map((i) => (
                              <li key={i.title} className={chip}>{i.title}</li>
                            ))}
                          </ul>
                          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">Typical uses</p>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {s.useCases.map((u) => (
                              <li key={u.title} className={chip}>{u.title}</li>
                            ))}
                          </ul>
                          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                            <Link href={`/services/${s.slug}`} className={textLink}>
                              View {s.title}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section aria-labelledby="mid-cta-title" className="bg-navy text-white">
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-12 lg:flex-row lg:items-center`}>
          <div className="max-w-2xl">
            <h2 id="mid-cta-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">{hub.midCta.h2}</h2>
            <p className="mt-2 text-lg leading-8 text-white/75">{hub.midCta.text}</p>
          </div>
          <ContactButtons quoteHref="#quote" />
        </div>
      </section>

      {/* Comparison table */}
      <section id="compare" aria-labelledby="compare-title" className={`${wrap} py-16`}>
        <p className={eyebrow}>Compare</p>
        <h2 id="compare-title" className={h2}>Compare our transport services</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          A side-by-side view of what each service covers, who it suits and what we ask for when
          preparing your quotation.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">Comparison of Gulf Elite Transport services</caption>
            <thead className="bg-navy text-white">
              <tr>
                <th scope="col" className="p-4 font-bold">Service</th>
                <th scope="col" className="p-4 font-bold">Best for</th>
                <th scope="col" className="p-4 font-bold">What it covers</th>
                <th scope="col" className="p-4 font-bold text-accent">What we ask for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {services.map((s) => (
                <tr key={s.slug} className="align-top">
                  <th scope="row" className="p-4 font-bold text-navy">
                    <Link href={`/services/${s.slug}`} className={textLink}>{s.title}</Link>
                  </th>
                  <td className="p-4 leading-6 text-muted">{s.audienceShort}</td>
                  <td className="p-4 leading-6 text-muted">{s.includes.slice(0, 3).map((i) => i.title).join("; ")}</td>
                  <td className="p-4 leading-6 text-muted">{s.quoteInfo.slice(0, 3).join("; ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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

      {/* Selection guide */}
      <section id="guide" aria-labelledby="guide-title" className="bg-white py-16">
        <div className={wrap}>
          <h2 id="guide-title" className="text-3xl font-extrabold tracking-tight text-navy">{hub.selectionGuide.h2}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{hub.selectionGuide.text}</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10 bg-surface">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
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
        </div>
      </section>

      {/* Why choose */}
      <section aria-labelledby="why-title" className={`${wrap} py-16`}>
        <h2 id="why-title" className="text-3xl font-extrabold tracking-tight text-navy">{hub.hubWhy.h2}</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {hub.hubWhy.items.map((w) => (
            <li key={w} className="flex gap-3 rounded-xl border border-navy/10 bg-white p-5 text-navy">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {w}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-5">
          <p className={eyebrow}>FAQ</p>
          <h2 id="faq-title" className={h2}>Transport services: frequently asked questions</h2>
          <div className="mt-8">
            <FaqList items={hub.hubFaqs} />
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
