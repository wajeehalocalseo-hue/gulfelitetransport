import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookForm from "@/components/BookForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { pageGraph } from "@/lib/schema";

const title = "Book a Taxi Ride in Saudi Arabia";
const description = "Send your pickup, drop-off, date and passenger details. We confirm the vehicle, driver and fare with you before you commit. No payment now.";

export const metadata: Metadata = {
  title: "Book a Taxi Ride",
  description,
  alternates: { canonical: "/book" },
  openGraph: { title, description, url: "/book" },
};

const steps = [
  { t: "Send your journey", d: "Pickup, drop-off, date, time, passengers and bags, with your contact details." },
  { t: "We check the ride", d: "We look at the vehicle size, the pickup point and the timing, and tell you plainly if something cannot be arranged." },
  { t: "You get the confirmation", d: "The vehicle, driver details and fare are confirmed with you before you commit to anything." },
  { t: "Your driver meets you", d: "The driver collects you at the agreed point and takes you to your destination." },
];

const ready = [
  { t: "Exact places", d: "A hotel name, an address or an airport with the terminal. For a flight pickup, add the flight number in the notes." },
  { t: "Passengers and bags", d: "How many people travel and how many large bags. This decides the size of the vehicle." },
  { t: "Special needs", d: "Elderly travellers, wheelchair users and young children, so the pickup and the vehicle suit them." },
  { t: "A return ride", d: "If you also need the ride back, say so in the notes and give the date and time." },
];

const rides = [
  { name: "Jeddah airport to Makkah", href: "/umrah-hajj-taxi/jeddah-airport-to-makkah" },
  { name: "Makkah to Madinah", href: "/taxi-saudi-arabia/routes/makkah-to-madinah" },
  { name: "Madinah airport to Makkah", href: "/umrah-hajj-taxi/madinah-airport-to-makkah" },
  { name: "Taif airport to Makkah", href: "/umrah-hajj-taxi/taif-airport-to-makkah" },
  { name: "Jeddah to Makkah", href: "/taxi-saudi-arabia/routes/jeddah-to-makkah" },
  { name: "Taxi in all Saudi cities", href: "/taxi-saudi-arabia" },
];

const faqs = [
  { q: "Do I pay when I send the request?", a: "No. Nothing is paid when you send the form. The fare is confirmed with you first." },
  { q: "Is the price shown on this page?", a: "No. We do not publish standard fares, because the price depends on the route, the vehicle, the date and the stops. You get the fare before you commit." },
  { q: "How many passengers can I book for?", a: "Any number. Send the count and we choose one vehicle or several of the right size, from a sedan to a coach." },
  { q: "Can I book a return ride or a ride for a later date?", a: "Yes. Put the return date and time in the notes, or send a second request for the later date." },
  { q: "Who provides the ride?", a: "Rides are arranged with licensed local drivers and transport providers in Saudi Arabia. Gulf Elite Transport Group takes your request, passes it to a suitable provider and confirms the details with you." },
  { q: "What if I need freight or equipment moved instead?", a: "Use the contact page to request a quotation for freight, equipment moving or contract fleet services." },
];

export default function BookPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/book",
          name: title,
          description,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Book a Ride", path: "/book" },
          ],
          service: { name: "Taxi & cab booking", description, serviceType: "Taxi service" },
        })}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Book a Ride" }]}
        h1="Book Your Ride"
        lead="Tell us where and when. We confirm the vehicle, driver and fare with you before you commit."
        booking={false}
      />

      <div className="mx-auto max-w-3xl px-5 py-12">
        <Suspense fallback={<p className="text-muted">Loading the booking form...</p>}>
          <BookForm />
        </Suspense>
      </div>

      <section aria-labelledby="how-title" className="border-t border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 id="how-title" className="text-3xl font-extrabold text-navy">How your booking works</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Gulf Elite Transport arranges taxi and car rides across Saudi Arabia, for one passenger or a large group. Nothing is charged when you send this form.
          </p>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-2xl bg-surface p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-extrabold text-white">{i + 1}</span>
                <h3 className="mt-3 font-extrabold text-navy">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ready-title" className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 id="ready-title" className="text-3xl font-extrabold text-navy">What to have ready</h2>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {ready.map((r) => (
              <div key={r.t} className="rounded-2xl bg-white p-5 ring-1 ring-navy/10">
                <dt className="font-extrabold text-navy">{r.t}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">{r.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="rides-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 id="rides-title" className="text-3xl font-extrabold text-navy">Popular rides</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">Read about the route before you book. Each page covers the ride in both directions.</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {rides.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="inline-block rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy hover:border-accent hover:bg-accent/10">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <h2 id="faq-title" className="text-3xl font-extrabold text-navy">Booking questions</h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl bg-white p-5 ring-1 ring-navy/10">
                <summary className="cursor-pointer font-bold text-navy">{f.q}</summary>
                <p className="mt-3 text-sm leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
