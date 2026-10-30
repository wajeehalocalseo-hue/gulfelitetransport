import Link from "next/link";
import { services } from "@/content/services";
import { site, telUrl, whatsappUrl } from "@/lib/site";

export default function SiteFooter() {
  const wa = whatsappUrl();
  return (
    <footer className="bg-navy pb-24 pt-16 text-white/75 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 lg:grid-cols-[1fr_1.7fr_0.8fr_1fr]">
        <div>
          <p className="text-lg font-extrabold text-white">
            Gulf Elite <span className="text-accent">Transport</span>
          </p>
          <p className="mt-4 text-sm leading-7">
            Freight and cargo, passenger transport, equipment and machinery
            moving, contract fleet, delivery, distribution and storage services for businesses.
          </p>
        </div>

        <nav aria-label="Services">
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-4 space-y-2 text-sm sm:columns-2 sm:gap-x-6">
            {services.map((s) => (
              <li key={s.slug} className="break-inside-avoid">
                <Link href={`/services/${s.slug}`} className="hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link href="/services" className="hover:text-accent">All Services</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-accent">Terms &amp; Conditions</Link></li>
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            {telUrl && <li><a href={telUrl} className="hover:text-accent">{site.phone}</a></li>}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  WhatsApp
                </a>
              </li>
            )}
            {site.email && <li><a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a></li>}
            {site.address && <li>{site.address}</li>}
            {site.hours && <li>{site.hours}</li>}
            <li>
              <Link href="/#quote" className="font-semibold text-accent hover:underline">
                Request a free quote
              </Link>
            </li>
            {site.socialProfiles.map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noopener noreferrer me" className="hover:text-accent">
                  {new URL(u).hostname.replace("www.", "")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-5 pt-6 text-xs text-white/60">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
