/**
 * Central business configuration. Edit ONLY this file to update verified details.
 *
 * Anything left as "" / [] is treated as "not verified yet": the related
 * buttons, schema fields and page sections are hidden automatically instead of
 * showing made-up information.
 */
export const site = {
  name: "Gulf Elite Transport",
  // Registered company name, used in the footer and in structured data.
  legalName: "Gulf Elite Transport Group",
  // Production origin used for canonical URLs, sitemap, schema and llms.txt.
  url: "https://gulfelitetransportgroup.com",
  language: "en",

  // --- Contact (REQUIRED before launch) ---
  phone: "", // e.g. "+971 50 000 0000"
  whatsapp: "966579858464", // digits only with country code, e.g. "971500000000"
  email: "", // e.g. "info@yourdomain.com"
  address: "", // full verified street address, if you want it shown
  country: "Saudi Arabia", // business country
  hours: "Open 24 hours, 7 days a week", // confirmed by the owner

  // --- Verified facts (leave empty until confirmed) ---
  serviceAreas: ["Saudi Arabia"] as string[], // only confirmed areas
  socialProfiles: [] as string[], // full URLs of real profiles
  certifications: ["Licensed and insured"] as string[], // confirmed by the owner
  // How the "Get a quote" buttons reach you. "form" sends visitors to the quote form on the page.
  // When the WhatsApp number above is verified, change this to "whatsapp" and every quote button switches at once.
  contactMethod: "whatsapp" as "form" | "whatsapp",
  // --- Real figures for the home page (leave "" until you have the real number; nothing shows while empty) ---
  proof: {
    passengersServed: "10,000+", // owner-provided figure
    drivers: "60+", // owner-provided figure
    googleRating: "", // e.g. "4.8" (your real Google Business Profile rating)
    googleReviews: "400+", // owner-provided figure
    googleReviewsUrl: "", // the link to your Google reviews
  },
};

export const contactConfigured = {
  phone: site.phone !== "",
  whatsapp: site.whatsapp !== "",
  email: site.email !== "",
};

export const telUrl = site.phone ? `tel:${site.phone.replace(/[^+\d]/g, "")}` : null;

export const whatsappUrl = (text?: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : null;

/** Where a "Get a quote" button goes: the quote form now, or WhatsApp once contactMethod is "whatsapp" and a number is set. */
export const ctaHref = (message?: string, formHref = "#quote") =>
  site.contactMethod === "whatsapp" ? (whatsappUrl(message) ?? formHref) : formHref;
export const mailtoUrl = (subject: string, body: string) =>
  site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#industries", label: "Industries" },
  { href: "/taxi-saudi-arabia", label: "Coverage Areas" },
  { href: "/contact", label: "Contact" },
] as const;

export const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;
