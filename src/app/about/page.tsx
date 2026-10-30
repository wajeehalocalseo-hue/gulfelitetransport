import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}: who we are and how we work.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6 py-20">
      <h1 className="text-4xl font-bold">About {site.name}</h1>
      {/* TODO: replace with the real company story, years in business, fleet size, licences. */}
      <p className="mt-6 text-lg leading-8 text-zinc-600">
        {site.name} is a transport company focused on reliable, on-time service
        for businesses and individuals. We keep our vehicles well maintained and
        our drivers professional, so your cargo and passengers arrive safely.
      </p>
      <h2 className="mt-12 text-2xl font-semibold">What we stand for</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-600">
        <li>Punctual pickups and deliveries</li>
        <li>Clear, upfront pricing</li>
        <li>Well-maintained vehicles and trained drivers</li>
        <li>Responsive support by phone and WhatsApp</li>
      </ul>
    </main>
  );
}
