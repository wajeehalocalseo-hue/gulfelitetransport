import Link from "next/link";
import Icon from "./Icon";
import { site, whatsappUrl } from "@/lib/site";

export default function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-3 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
      <Link
        href="/#book"
        className="rounded-full bg-gold py-3 text-center text-sm font-semibold text-ink"
      >
        Book Now
      </Link>
      <a
        href={whatsappUrl(`Hello ${site.name}, I would like to book a ride.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 py-3 text-sm font-semibold text-white"
      >
        <Icon name="chat" className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  );
}
