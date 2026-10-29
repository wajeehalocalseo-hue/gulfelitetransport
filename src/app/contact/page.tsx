import type { Metadata } from "next";
import { site } from "@/lib/site";
import QuoteForm from "../QuoteForm";

export const metadata: Metadata = {
  title: "Contact & Free Quote",
  description: `Contact ${site.name} or request a free transport quote.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 py-20 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">Contact us</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Call, email or send a quote request and we will reply quickly.
        </p>
        <ul className="mt-8 space-y-2 font-medium">
          <li>
            Phone: <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          </li>
          <li>
            WhatsApp:{" "}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
              Chat now
            </a>
          </li>
          <li>
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        </ul>
      </div>
      <div className="text-zinc-900">
        <QuoteForm />
      </div>
    </main>
  );
}
