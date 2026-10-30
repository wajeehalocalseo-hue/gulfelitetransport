import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { pageGraph } from "@/lib/schema";
import { site, telUrl, whatsappUrl } from "@/lib/site";

const title = "Contact Gulf Elite Transport";
const description =
  "Contact Gulf Elite Transport or request a free transport quotation for freight, passenger transport, equipment moving or contract fleet services.";

export const metadata: Metadata = {
  title: "Contact Us",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
};

const link = "font-semibold text-navy underline decoration-accent decoration-2 underline-offset-4";

export default function ContactPage() {
  const wa = whatsappUrl();
  const hasAny = Boolean(telUrl || wa || site.email || site.address || site.hours);
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/contact",
          name: title,
          description,
          type: "ContactPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ],
        })}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact Us" }]}
        h1="Contact Us"
        lead="Tell us about your transport requirement and we will respond with a quotation or any questions we need answered."
      />
      <div id="quote" className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <section aria-labelledby="details-title">
          <h2 id="details-title" className="text-2xl font-extrabold text-navy">Contact details</h2>
          {hasAny ? (
            <ul className="mt-5 space-y-3 text-lg text-muted">
              {telUrl && <li>Phone: <a href={telUrl} className={link}>{site.phone}</a></li>}
              {wa && (
                <li>
                  WhatsApp:{" "}
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={link}>Chat with us</a>
                </li>
              )}
              {site.email && <li>Email: <a href={`mailto:${site.email}`} className={link}>{site.email}</a></li>}
              {site.address && <li>Address: {site.address}</li>}
              {site.hours && <li>Hours: {site.hours}</li>}
            </ul>
          ) : (
            <p className="mt-5 text-lg leading-8 text-muted">
              Direct contact details will be published here. In the meantime, please use the quote
              form.
            </p>
          )}
          <p className="mt-6 leading-7 text-muted">
            To confirm availability for your pickup and delivery locations, include them in your
            request.
          </p>
        </section>
        <section aria-labelledby="form-title" className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 id="form-title" className="mb-6 text-2xl font-extrabold text-navy">Request a free quote</h2>
          <QuoteForm />
        </section>
      </div>
    </main>
  );
}
