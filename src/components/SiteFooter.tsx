import Link from "next/link";
import { site, telUrl, whatsappUrl } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-white/75 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-semibold text-white">
            <span className="text-gold">Gulf</span> Elite Transport
          </p>
          <p className="mt-4 max-w-md text-sm leading-7">
            Private chauffeur, airport and intercity transfers with professional
            drivers. Share your journey and we will send you a clear quote.
          </p>
        </div>

        <nav aria-label="Services">
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.services.slice(0, 4).map((s) => (
              <li key={s.id}>
                <Link href={`/#${s.id}`} className="hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#fleet" className="hover:text-gold">Fleet</Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={telUrl} className="hover:text-gold">{site.phone}</a></li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
            <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-5 pt-6 text-xs text-white/50">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
