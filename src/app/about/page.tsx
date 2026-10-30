import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { about } from "@/content/home";
import { services } from "@/content/services";
import { pageGraph } from "@/lib/schema";

const title = "About Gulf Elite Transport";
const description =
  "Learn how Gulf Elite Transport helps businesses arrange freight, passenger transport, equipment moving and contract fleet services.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

const link = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/about",
          name: title,
          description,
          type: "AboutPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ],
        })}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "About Us" }]}
        h1="About Gulf Elite Transport"
        lead="A transport and logistics service built around dependable coordination."
      />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy">{about.h2}</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-extrabold text-navy">What we do</h2>
        <ul className="mt-5 space-y-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className={link}>
                {s.title}
              </Link>
              <span className="text-muted"> - {s.short}</span>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-lg leading-8 text-muted">
          Ready to talk about your requirement?{" "}
          <Link href="/contact" className={link}>
            Contact our team
          </Link>{" "}
          or{" "}
          <Link href="/#quote" className={link}>
            request a free quote
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
