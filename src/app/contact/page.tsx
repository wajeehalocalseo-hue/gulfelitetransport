import type { Metadata } from "next";
import { site, telUrl, whatsappUrl } from "@/lib/site";
import BookingForm from "../BookingForm";

export const metadata: Metadata = {
  title: "Contact & Free Quote",
  description: `Contact ${site.name} or request a free transport quote.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main id="main" className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-5 py-20 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Contact us</h1>
        <p className="mt-4 text-zinc-600">
          Call, email or send a quote request and we will reply quickly.
        </p>
        <ul className="mt-8 space-y-2 font-medium">
          <li>
            Phone: <a href={telUrl} className="underline decoration-gold underline-offset-4">{site.phone}</a>
          </li>
          <li>
            WhatsApp:{" "}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">
              Chat now
            </a>
          </li>
          <li>
            Email: <a href={`mailto:${site.email}`} className="underline decoration-gold underline-offset-4">{site.email}</a>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <BookingForm id="contact" />
      </div>
    </main>
  );
}
