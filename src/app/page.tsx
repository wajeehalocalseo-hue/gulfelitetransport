import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { site, telUrl, whatsappUrl } from "@/lib/site";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      description: site.description,
      url: site.url,
      ...(site.contactVerified ? { telephone: site.phone, email: site.email } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: `${site.name} | ${site.tagline}`,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#business` },
    },
  ],
};

const eyebrow = "text-sm font-semibold uppercase tracking-[0.2em] text-gold";
const h2 = "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl";
const cta =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center font-semibold transition";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,75,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.06),transparent_50%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className={eyebrow}>Chauffeur &amp; Airport Transfers</p>
            <h1
              id="hero-title"
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              Private chauffeur and airport transfers, done properly
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Professional drivers, comfortable vehicles and a clear quote
              before you confirm. Book by form or message us on WhatsApp.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#book" className={`${cta} bg-gold text-ink hover:brightness-110`}>
                Book Your Ride
              </Link>
              <a
                href={whatsappUrl(`Hello ${site.name}, I would like to book a ride.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cta} border border-white/30 hover:border-gold hover:text-gold`}
              >
                WhatsApp Us
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              {["Private transfers", "Professional drivers", "Easy WhatsApp booking"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div id="book" className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl sm:p-8">
            <h2 className="text-2xl font-semibold">Request your quote</h2>
            <p className="mb-6 mt-1 text-sm text-zinc-600">
              Share your journey and we will reply on WhatsApp.
            </p>
            <BookingForm id="hero" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="mx-auto max-w-7xl px-5 py-20">
        <p className={eyebrow}>Why riders choose us</p>
        <h2 id="benefits-title" className={h2}>A calmer way to travel</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.benefits.map((b) => (
            <article key={b.title} className="rounded-2xl border border-black/10 bg-white p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-gold">
                <Icon name={b.icon} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-600">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className={eyebrow}>Services</p>
          <h2 id="services-title" className={h2}>Popular transportation services</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.services.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="flex flex-col rounded-2xl border border-black/10 bg-ivory p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon name={s.icon} className="h-8 w-8 text-gold" />
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">{s.text}</p>
                <Link
                  href="#book"
                  aria-label={`Book ${s.title}`}
                  className="mt-5 text-sm font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4"
                >
                  Book this service
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Routes: shown only when real routes are added in site.ts */}
      {site.routes.length > 0 && (
        <section aria-labelledby="routes-title" className="mx-auto max-w-7xl px-5 py-20">
          <p className={eyebrow}>Destinations</p>
          <h2 id="routes-title" className={h2}>Popular routes</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.routes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-2xl border border-black/10 bg-white p-6 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">
                  {r.from} to {r.to}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">{r.text}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Fleet */}
      <section id="fleet" aria-labelledby="fleet-title" className="mx-auto max-w-7xl px-5 py-20">
        <p className={eyebrow}>Fleet</p>
        <h2 id="fleet-title" className={h2}>Choose the right vehicle</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.fleet.map((v) => (
            <article key={v.name} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              {/* TODO: replace with a real vehicle photo (aspect-[4/3]) */}
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-charcoal to-ink text-gold/80">
                <Icon name="car" className="h-16 w-16" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{v.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">{v.category}</p>
                {(v.passengers || v.luggage) && (
                  <p className="mt-3 text-sm text-zinc-700">
                    {v.passengers && <>Passengers: {v.passengers}</>}
                    {v.passengers && v.luggage && " · "}
                    {v.luggage && <>Luggage: {v.luggage}</>}
                  </p>
                )}
                {v.features.length > 0 && (
                  <ul className="mt-3 list-disc pl-5 text-sm text-zinc-600">
                    {v.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
                <Link
                  href="#book"
                  className="mt-5 inline-block text-sm font-semibold underline decoration-gold decoration-2 underline-offset-4"
                >
                  Book this vehicle
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-title" className="bg-ink py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2">
          <div>
            <p className={eyebrow}>Why choose us</p>
            <h2 id="why-title" className={h2}>What you can expect</h2>
            <p className="mt-5 max-w-md text-white/70">
              Straightforward service, built around your schedule.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {site.whyUs.map((w) => (
              <li key={w} className="flex gap-3 rounded-xl border border-white/10 bg-charcoal p-5">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-title" className="mx-auto max-w-7xl px-5 py-20">
        <p className={eyebrow}>How it works</p>
        <h2 id="how-title" className={h2}>Book in three simple steps</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {site.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-black/10 bg-white p-6">
              <span className="text-4xl font-semibold text-gold">{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-5">
          <p className={eyebrow}>FAQ</p>
          <h2 id="faq-title" className={h2}>Frequently asked questions</h2>
          <div className="mt-10 divide-y divide-black/10 rounded-2xl border border-black/10">
            {site.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <Icon name="chevron" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-title" className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 id="cta-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to book your transfer?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Tell us where and when. We will confirm availability and send your quote.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#book" className={`${cta} bg-gold text-ink hover:brightness-110`}>
              Book Now
            </Link>
            <a
              href={whatsappUrl(`Hello ${site.name}, I would like to book a ride.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cta} border border-white/30 hover:border-gold hover:text-gold`}
            >
              WhatsApp Us
            </a>
            <a href={telUrl} className={`${cta} border border-white/30 hover:border-gold hover:text-gold`}>
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
