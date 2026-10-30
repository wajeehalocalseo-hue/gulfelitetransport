/**
 * Central business configuration. Edit ONLY this file to update verified details.
 *
 * Anything left as "" / [] is treated as "not verified yet": the related
 * buttons, schema fields and page sections are hidden automatically instead of
 * showing made-up information.
 */
export const site = {
  name: "Gulf Elite Transport",
  // Production origin used for canonical URLs, sitemap, schema and llms.txt.
  url: "https://gulfelitetransport.wajeehalocalseo.workers.dev",
  language: "en",

  // --- Contact (REQUIRED before launch) ---
  phone: "", // e.g. "+971 50 000 0000"
  whatsapp: "", // digits only with country code, e.g. "971500000000"
  email: "", // e.g. "info@yourdomain.com"
  address: "", // full verified street address, if you want it shown
  country: "", // verified business country
  hours: "", // verified opening hours, if any

  // --- Verified facts (leave empty until confirmed) ---
  serviceAreas: [] as string[], // e.g. ["Dubai", "Abu Dhabi"] - only verified ones
  socialProfiles: [] as string[], // full URLs of real profiles
  certifications: [] as string[], // verified certifications only
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

export const mailtoUrl = (subject: string, body: string) =>
  site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#industries", label: "Industries" },
  { href: "/#coverage", label: "Coverage Areas" },
  { href: "/contact", label: "Contact" },
] as const;

export const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;
