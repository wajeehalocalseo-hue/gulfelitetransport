import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { pageGraph } from "@/lib/schema";
import { site } from "@/lib/site";

const description = `How ${site.name} handles the information you share when you contact us or request a quote.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy-policy" },
};

// TODO: have this reviewed by a qualified professional for your jurisdiction before launch.
export default function PrivacyPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/privacy-policy",
          name: "Privacy Policy",
          description,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy" },
          ],
        })}
      />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} h1="Privacy Policy" />
      <article className="mx-auto max-w-3xl space-y-6 px-5 py-16 leading-8 text-muted">
        <p>
          This policy explains how {site.name} handles information when you use this website. It
          reflects how the website currently works.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Information you provide</h2>
        <p>
          When you use the quote form, you may provide your name, business name, phone number,
          email address, pickup and delivery locations, preferred date and details about your
          transport requirement. This website does not store these details. The form prepares a
          message that you send yourself through WhatsApp or your email application.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">How we use it</h2>
        <p>
          Information you send to us is used to assess your request, prepare a quotation, confirm
          availability and communicate with you about the service. We do not sell your information.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Third-party services</h2>
        <p>
          If you choose to contact us through WhatsApp or email, those services process your
          message under their own privacy policies. The website also loads its font from Google
          Fonts at build time and serves it from this website. It does not use advertising or
          analytics cookies at the time of writing.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Your choices</h2>
        <p>
          You can ask us to correct or delete information you have sent to us by contacting us
          through the details on the contact page.
        </p>
        <h2 className="text-2xl font-extrabold text-navy">Changes</h2>
        <p>We may update this policy if the way the website works changes.</p>
      </article>
    </main>
  );
}
