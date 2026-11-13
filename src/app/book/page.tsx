import type { Metadata } from "next";
import { Suspense } from "react";
import BookWizard from "@/components/BookWizard";
import PageHero from "@/components/PageHero";

// A booking tool filled in from the short form; it has no content of its own to rank, so it stays out of search results.
export const metadata: Metadata = {
  title: "Book a Ride",
  description: "Choose your vehicle and send your taxi booking request. The fare is confirmed with you before you commit.",
  alternates: { canonical: "/book" },
  robots: { index: false, follow: true },
};

export default function BookPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Book a Ride" }]} h1="Book Your Ride" />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Suspense fallback={<p className="text-muted">Loading the booking form...</p>}>
          <BookWizard />
        </Suspense>
      </div>
    </main>
  );
}
