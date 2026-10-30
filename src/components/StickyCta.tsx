import Link from "next/link";
import Icon from "./Icon";
import { site, telUrl, whatsappUrl } from "@/lib/site";

export default function StickyCta() {
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a transport quote.`);
  const secondary = wa
    ? { href: wa, label: "WhatsApp", icon: "chat", external: true }
    : telUrl
      ? { href: telUrl, label: "Call", icon: "phone", external: false }
      : null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 grid gap-3 border-t border-white/10 bg-navy/95 p-3 backdrop-blur md:hidden ${secondary ? "grid-cols-2" : "grid-cols-1"}`}
    >
      <Link
        href="/#quote"
        className="rounded-full bg-accent py-3 text-center text-sm font-bold text-navy"
      >
        Get a Free Quote
      </Link>
      {secondary && (
        <a
          href={secondary.href}
          {...(secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 py-3 text-sm font-semibold text-white"
        >
          <Icon name={secondary.icon} className="h-4 w-4" /> {secondary.label}
        </a>
      )}
    </div>
  );
}
