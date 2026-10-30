import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { services } from "@/content/services";
import { pageGraph } from "@/lib/schema";

const title = "Transport & Logistics Services";
const description =
  "Freight and cargo transport, passenger transport, equipment and machinery moving and contract fleet services from Gulf Elite Transport.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
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
        })}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        h1="Transport & Logistics Services"
        lead="Four coordinated service categories for businesses that need to move goods, people and equipment."
      />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="max-w-3xl text-lg leading-8 text-muted">
          Gulf Elite Transport provides freight and cargo transport, passenger transport, equipment
          and machinery moving, and contract fleet services. Choose a service below to see what is
          included, who it is for and what information we need to prepare your quotation.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.slug} className="flex flex-col rounded-2xl border border-navy/10 bg-white p-7">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-accent">
                <Icon name={s.icon} className="h-8 w-8" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-navy">{s.title}</h2>
              <p className="mt-3 flex-1 leading-7 text-muted">{s.short}</p>
              <Link
                href={`/services/${s.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4"
              >
                View {s.title} <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
