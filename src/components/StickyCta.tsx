import Link from "next/link";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";

export default function StickyCta() {
  const wa = whatsappUrl(`Hello ${site.name}, I would like to book a ride.`);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 grid gap-3 border-t border-white/10 bg-navy/95 p-3 backdrop-blur md:hidden ${wa ? "grid-cols-[1.6fr_1fr]" : "grid-cols-1"}`}
    >
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-center text-sm font-extrabold text-[#06391f]"
        >
          <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
        </a>
      ) : null}
      <Link
        href="/#quote"
        className={`rounded-full py-3 text-center text-sm font-bold ${wa ? "border border-white/30 text-white" : "bg-accent text-navy"}`}
      >
        {wa ? "Booking Form" : "Get a Free Quote"}
      </Link>
    </div>
  );
}
