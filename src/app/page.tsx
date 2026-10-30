import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import * as c from "@/content/home";
import { services } from "@/content/services";
import { pageGraph } from "@/lib/schema";
import { site, telUrl, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const eyebrow = "text-sm font-bold uppercase tracking-[0.18em] text-accent";
const h2 = "mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl";
const lead = "mt-4 max-w-3xl text-lg leading-8 text-muted";
const wrap = "mx-auto max-w-7xl px-5";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-center font-bold transition";
const btnPrimary = `${btn} bg-accent text-navy hover:brightness-95`;
const btnGhost = `${btn} border border-white/30 text-white hover:border-accent hover:text-accent`;

export default function Home() {
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a transport quote.`);
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/",
          name: "Gulf Elite Transport | Freight, Cargo & Passenger Transport",
          description:
            "Freight, cargo, passenger transport, equipment moving and contract fleet solutions.",
        })}
      />

      {/* 1. Hero */}
      <section aria-labelledby="hero-title" className="bg-navy text-white">
        <div className={`${wrap} grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24`}>
          <div>
            <p className={eyebrow}>{c.hero.eyebrow}</p>
            <h1
              id="hero-title"
              className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {c.hero.h1}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">{c.hero.text}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#quote" className={btnPrimary}>
                Get a Free Quote
              </Link>
              <Link href="/services" className={btnGhost}>
                Explore Our Services
              </Link>
              {telUrl && (
                <a href={telUrl} className={btnGhost}>
                  <Icon name="phone" className="h-4 w-4" /> Call Now
                </a>
              )}
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  <Icon name="chat" className="h-4 w-4" /> WhatsApp Us
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Service categories" className="rounded-2xl bg-navy-2 p-6 ring-1 ring-white/10 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/60">What we help move</p>
            <ul className="mt-5 grid gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-4 rounded-xl bg-navy/60 p-4 ring-1 ring-white/10 transition hover:ring-accent"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-navy">
                      <Icon name={s.icon} />
                    </span>
                    <span className="flex-1 font-semibold">{s.title}</span>
                    <Icon name="arrow" className="h-5 w-5 text-white/50 transition group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 3. Trust & value */}
      <section aria-labelledby="value-title" className={`${wrap} py-20`}>
        <p className={eyebrow}>{c.valueIntro.eyebrow}</p>
        <h2 id="value-title" className={h2}>{c.valueIntro.h2}</h2>
        <p className={lead}>{c.valueIntro.text}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.valueProps.map((v) => (
            <article key={v.title} className="rounded-2xl border border-navy/10 bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent">
                <Icon name={v.icon} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy">{v.title}</h3>
              <p className="mt-2 leading-7 text-muted">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Services */}
      <section aria-labelledby="services-title" className="bg-white py-20">
        <div className={wrap}>
          <p className={eyebrow}>{c.servicesIntro.eyebrow}</p>
          <h2 id="services-title" className={h2}>{c.servicesIntro.h2}</h2>
          <p className={lead}>{c.servicesIntro.text}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.slug}
                className="flex flex-col rounded-2xl border border-navy/10 bg-surface p-7 transition hover:shadow-lg"
              >
                <div className="flex aspect-[16/7] items-center justify-center rounded-xl bg-navy text-accent">
                  <Icon name={s.icon} className="h-14 w-14" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-navy">{s.title}</h3>
                <p className="mt-3 leading-7 text-muted">{s.short}</p>
                <ul className="mt-4 space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-sm font-medium text-navy">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4"
                >
                  Learn more about {s.title} <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About */}
      <section aria-labelledby="about-title" className={`${wrap} grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <p className={eyebrow}>{c.about.eyebrow}</p>
          <h2 id="about-title" className={h2}>{c.about.h2}</h2>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4"
          >
            Read more about us <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-5 text-lg leading-8 text-muted">
          {c.about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {/* 6. Industries */}
      <section id="industries" aria-labelledby="industries-title" className="bg-navy py-20 text-white">
        <div className={wrap}>
          <p className={eyebrow}>{c.industries.eyebrow}</p>
          <h2 id="industries-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.industries.h2}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{c.industries.text}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.industries.items.map((i) => (
              <article key={i.title} className="rounded-2xl bg-navy-2 p-6 ring-1 ring-white/10">
                <Icon name={i.icon} className="h-8 w-8 text-accent" />
                <h3 className="mt-4 text-lg font-bold">{i.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">{i.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Process */}
      <section aria-labelledby="process-title" className={`${wrap} py-20`}>
        <p className={eyebrow}>{c.process.eyebrow}</p>
        <h2 id="process-title" className={h2}>{c.process.h2}</h2>
        <p className={lead}>{c.process.text}</p>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {c.process.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-navy/10 bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl font-extrabold text-navy">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Planning guide */}
      <section aria-labelledby="guide-title" className="bg-white py-20">
        <div className={wrap}>
          <p className={eyebrow}>{c.guide.eyebrow}</p>
          <h2 id="guide-title" className={h2}>{c.guide.h2}</h2>
          <p className={lead}>{c.guide.text}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.guide.tips.map((t, i) => (
              <article key={t.title} className="rounded-2xl border border-navy/10 bg-surface p-6">
                <p className="text-sm font-bold text-accent">Tip {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-navy">{t.title}</h3>
                <p className="mt-2 leading-7 text-muted">{t.text}</p>
              </article>
            ))}
          </div>
          <h3 className="mt-16 text-2xl font-extrabold text-navy">{c.guide.prepHeading}</h3>
          <p className="mt-3 max-w-3xl leading-8 text-muted">{c.guide.prepText}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.guide.prep.map((p) => (
              <article key={p.slug} className="rounded-2xl border border-navy/10 bg-navy p-6 text-white">
                <h4 className="text-lg font-bold text-accent">{p.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/80">{p.text}</p>
                <Link
                  href={`/services/${p.slug}`}
                  className="mt-4 inline-block text-sm font-bold underline decoration-accent decoration-2 underline-offset-4"
                >
                  See full details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why choose */}
      <section aria-labelledby="why-title" className="py-20">
        <div className={wrap}>
          <p className={eyebrow}>{c.whyChoose.eyebrow}</p>
          <h2 id="why-title" className={h2}>{c.whyChoose.h2}</h2>
          <p className={lead}>{c.whyChoose.text}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.whyChoose.items.map((w) => (
              <article key={w.title} className="flex gap-4 rounded-2xl border border-navy/10 bg-white p-6">
                <Icon name="check" className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h3 className="text-lg font-bold text-navy">{w.title}</h3>
                  <p className="mt-1.5 leading-7 text-muted">{w.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Coverage */}
      <section id="coverage" aria-labelledby="coverage-title" className={`${wrap} py-20`}>
        <p className={eyebrow}>{c.coverage.eyebrow}</p>
        <h2 id="coverage-title" className={h2}>{c.coverage.h2}</h2>
        <p className={lead}>{c.coverage.text}</p>
        {site.serviceAreas.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-navy">{c.coverage.listHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {site.serviceAreas.map((a) => (
                <li key={a} className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
        <h3 className="mt-10 text-2xl font-extrabold text-navy">{c.coverage.howHeading}</h3>
        <p className="mt-3 max-w-3xl leading-8 text-muted">{c.coverage.howText}</p>
        <ol className="mt-5 max-w-3xl list-decimal space-y-3 pl-6 leading-8 text-muted marker:font-bold marker:text-accent">
          {c.coverage.how.map((h) => (
            <li key={h.slice(0, 20)}>{h}</li>
          ))}
        </ol>
        <p className="mt-8 rounded-xl border border-accent/50 bg-accent/10 p-5 font-semibold text-navy">
          {c.coverage.notice}{" "}
          <Link href="/contact" className="underline decoration-accent decoration-2 underline-offset-4">
            Contact us
          </Link>
          .
        </p>
      </section>

      {/* 10. Fleet */}
      <section aria-labelledby="fleet-title" className="bg-white py-20">
        <div className={wrap}>
          <p className={eyebrow}>{c.fleet.eyebrow}</p>
          <h2 id="fleet-title" className={h2}>{c.fleet.h2}</h2>
          <p className={lead}>{c.fleet.text}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.fleet.items.map((f) => (
              <article key={f.title} className="overflow-hidden rounded-2xl border border-navy/10 bg-surface">
                <div className="flex aspect-[16/9] items-center justify-center bg-navy text-accent">
                  <Icon name={f.icon} className="h-14 w-14" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Benefits comparison */}
      <section aria-labelledby="benefits-title" className={`${wrap} py-20`}>
        <p className={eyebrow}>{c.benefits.eyebrow}</p>
        <h2 id="benefits-title" className={h2}>{c.benefits.h2}</h2>
        <p className={lead}>{c.benefits.text}</p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Comparison of arranging transport yourself and using a coordinated transport service</caption>
            <thead className="bg-navy text-white">
              <tr>
                <th scope="col" className="p-4 font-bold">Topic</th>
                <th scope="col" className="p-4 font-bold">Arranging it yourself</th>
                <th scope="col" className="p-4 font-bold text-accent">With Gulf Elite Transport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {c.benefits.rows.map((r) => (
                <tr key={r.topic}>
                  <th scope="row" className="p-4 font-bold text-navy">{r.topic}</th>
                  <td className="p-4 leading-6 text-muted">{r.alone}</td>
                  <td className="p-4 leading-6 text-navy">{r.with}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-5">
          <p className={eyebrow}>FAQ</p>
          <h2 id="faq-title" className={h2}>Frequently asked questions about our transport services</h2>
          <div className="mt-10">
            <FaqList items={c.faqs} />
          </div>
        </div>
      </section>

      {/* 13. CTA band */}
      <section aria-labelledby="cta-title" className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 id="cta-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.ctaBand.h2}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">{c.ctaBand.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#quote" className={btnPrimary}>Get a Free Quote</Link>
            {telUrl && <a href={telUrl} className={btnGhost}>Call Now</a>}
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 14. Quote form */}
      <section id="quote" aria-labelledby="quote-title" className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className={eyebrow}>{c.formIntro.eyebrow}</p>
            <h2 id="quote-title" className={h2}>{c.formIntro.h2}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{c.formIntro.text}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
