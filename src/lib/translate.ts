/**
 * Page translation (English, Arabic, Urdu) with the Google website translator.
 * The choice is kept in the "googtrans" cookie, which is the cookie the Google translator itself reads ("/en/ar" means English to Arabic).
 * Nothing from Google loads until a visitor picks Arabic or Urdu, so English visitors are not slowed down.
 */
export type Lang = "en" | "ar" | "ur";

export const LANGUAGES: { code: Lang; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "ur", label: "اردو", dir: "rtl" },
];

export function currentLang(): Lang {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i);
  const code = m?.[1]?.toLowerCase();
  return code === "ar" || code === "ur" ? code : "en";
}

/** The cookie has to exist on the host and on the parent domain, because the Google script looks in both. */
function cookieHosts(): (string | null)[] {
  const host = window.location.hostname;
  const parts = host.split(".");
  const parent = parts.length > 2 ? "." + parts.slice(-2).join(".") : "." + host;
  return [null, host, parent];
}

export function setLang(lang: Lang): void {
  const secure = window.location.protocol === "https:" ? ";Secure" : "";
  for (const domain of cookieHosts()) {
    const d = domain ? `;domain=${domain}` : "";
    if (lang === "en") document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${d}`;
    else document.cookie = `googtrans=/en/${lang};path=/;max-age=31536000;SameSite=Lax${secure}${d}`;
  }
}
