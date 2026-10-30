import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { pageGraph } from "@/lib/schema";
import { site } from "@/lib/site";

const description = `Terms for using the ${site.name} website and requesting quotations.`;

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description,
  alternates: { canonical: "/terms-and-conditions" },
};

// TODO: have this reviewed by a qualified professional for your jurisdiction before launch.
export default function TermsPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/terms-and-conditions",
          name: "Terms & Conditions",
          description,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Terms & Conditions", path: "/terms-and-conditions" },
          ],
        })}
      />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Terms & Conditions" }]} h1="Terms & Conditions" />
      <article className="mx-auto max-w-3xl space-y-6 px-5 py-16 leading-8 text-muted">
        <p>These terms apply to your use of the {site.name} website.</p>
        <h2 className="text-2xl font-extrabold text-navy">Information on this website</h2>
        <p>
          The website describes our service categories for general information. It is not an offer
          to provide a service. Availability depends on locations, dates and vehicle type, and is
          confirmed individually for every request.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Quotations</h2>
        <p>
          Submitting a quote request does not create a transport agreement. A service is arranged
          only after a quotation has been provided and you have confirmed it. Quotations depend on
          the accuracy of the information you provide.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Your responsibilities</h2>
        <p>
          Please provide accurate details about cargo, passengers, equipment, locations and access.
          Inaccurate or incomplete information may change the quotation or the availability of a
          service.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Limitation</h2>
        <p>
          We make reasonable efforts to keep this website accurate but do not guarantee that it is
          free of errors or always up to date.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Changes</h2>
        <p>We may update these terms from time to time. Please review them when you visit.</p>
      </article>
    </main>
  );
}
