import Link from "next/link";
import Icon from "./Icon";
import { site, telUrl, whatsappUrl } from "@/lib/site";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-center font-bold transition";

/** Quote / call / WhatsApp buttons. Call and WhatsApp render only when verified contact details exist. */
export default function ContactButtons({
  quoteHref = "#quote",
  service,
  className = "",
  tone = "dark",
}: {
  quoteHref?: string;
  service?: string;
  className?: string;
  /** "dark" for use on a navy background, "light" on a light one. */
  tone?: "dark" | "light";
}) {
  const wa = whatsappUrl(
    `Hello ${site.name}, I would like information about ${service ?? "your transport services"}.`,
  );
  const secondary =
    tone === "light"
      ? "border border-navy/30 text-navy hover:border-accent hover:bg-accent/10"
      : "border border-white/30 text-white hover:border-accent hover:text-accent";
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <Link href={quoteHref} className={`${btn} bg-accent text-navy hover:brightness-95`}>
        Get a Free Quote
      </Link>
      {telUrl && (
        <a href={telUrl} className={`${btn} ${secondary}`}>
          <Icon name="phone" className="h-4 w-4" /> Call Now
        </a>
      )}
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn} ${secondary}`}>
          <Icon name="chat" className="h-4 w-4" /> WhatsApp Us
        </a>
      )}
    </div>
  );
}
