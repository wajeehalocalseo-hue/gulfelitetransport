import { site, whatsappUrl } from "@/lib/site";

/** The WhatsApp brand green. It is used only on WhatsApp buttons, so they stand out from the rest of the site. */
export const waPill =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-center font-extrabold text-[#06391f] shadow-sm transition hover:brightness-95 focus-visible:outline-navy";

/** Small and tight version for headers, cards and sticky bars. */
export const waPillSm =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-center text-sm font-extrabold text-[#06391f] shadow-sm transition hover:brightness-95 focus-visible:outline-navy";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="currentColor">
      <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.2 1.62 6.03L4 29l8.1-1.59a12 12 0 0 0 3.94.66c6.64 0 12.04-5.4 12.04-12.04S22.68 3 16.04 3Zm0 21.9c-1.3 0-2.58-.3-3.74-.86l-.54-.27-4.8.94.96-4.68-.3-.5a9.9 9.9 0 0 1-1.5-5.3c0-5.5 4.48-9.98 9.98-9.98s9.98 4.48 9.98 9.98-4.48 9.97-9.98 9.97Zm5.47-7.47c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15s-.77.98-.95 1.18c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

/** A prominent "book on WhatsApp" panel placed above the forms. The forms stay available below it. */
export function WhatsAppBanner({ message, className = "" }: { message?: string; className?: string }) {
  const href = whatsappUrl(message ?? `Hello ${site.name}, I would like to book a ride.`);
  if (!href) return null;
  return (
    <div className={`rounded-xl border border-[#25D366]/60 bg-[#25D366]/10 p-4 ${className}`}>
      <p className="text-sm font-extrabold text-navy">Fastest way to book: message us on WhatsApp</p>
      <p className="mt-1 text-xs leading-5 text-muted">Send your pickup, drop-off and date. We confirm the vehicle, driver and fare with you before you commit.</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${waPillSm} mt-3 w-full sm:w-auto`}>
        <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
      </a>
    </div>
  );
}
