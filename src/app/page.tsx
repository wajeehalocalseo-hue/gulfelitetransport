import { site } from "@/lib/site";
import QuoteForm from "./QuoteForm";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <section className="bg-brand text-white">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              {site.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#quote"
                className="rounded-full bg-accent px-8 py-3 text-center font-semibold text-black hover:brightness-110"
              >
                Get a Free Quote
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-8 py-3 text-center font-semibold hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {site.services.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <h3 className="text-xl font-semibold text-brand dark:text-accent">
                  {s.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="quote" className="bg-zinc-50 dark:bg-zinc-900">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Request a Free Quote</h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Tell us what you need moved and we will get back to you quickly.
              </p>
              <ul className="mt-8 space-y-2 font-medium">
                <li>
                  Phone:{" "}
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                </li>
                <li>
                  Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              </ul>
            </div>
            <div className="text-zinc-900 dark:text-zinc-900">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
