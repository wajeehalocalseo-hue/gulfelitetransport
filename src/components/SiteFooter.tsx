import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";
import { cities } from "@/content/saudi/cities";
import { cityHref } from "@/content/saudi/paths";
import { groups, services } from "@/content/services";
import { site, telUrl, whatsappUrl } from "@/lib/site";

const BASE = "/taxi-saudi-arabia";
const head = "text-sm font-bold uppercase tracking-[0.14em] text-white";
const link = "text-white/70 transition hover:text-accent";

export default function SiteFooter() {
  const wa = whatsappUrl();
  const contact = [
    telUrl && { href: telUrl, label: site.phone, icon: "phone", external: false },
    wa && { href: wa, label: "WhatsApp", icon: "chat", external: true },
    site.email && { href: `mailto:${site.email}`, label: site.email, icon: "mail", external: false },
  ].filter(Boolean) as { href: string; label: string; icon: string; external: boolean }[];

  return (
    <footer className="bg-[#0b1320] pb-24 text-white/70 md:pb-0">
      {/* Call-to-action strip */}
      <div className="border-b border-white/10 bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-9 md:flex-row md:items-center">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-white">Need a ride or a transport quote?</p>
            <p className="mt-1 text-white/70">Tell us where and what. We confirm the vehicle, driver and fare before you commit.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/#quote" className="rounded-full bg-accent px-6 py-3 font-bold text-navy transition hover:brightness-95">
              Request a Ride or Quote
            </Link>
            <Link href={BASE} className="rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:border-accent hover:text-accent">
              Find Your City
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.6fr_0.8fr]">
        <div>
          <Link href="/" aria-label="Gulf Elite Transport, home" className="inline-block rounded-lg">
            <Logo tone="dark" />
          </Link>
          <p className="mt-5 text-sm leading-7">
            Taxi and cab rides, freight and cargo, passenger transport, equipment moving, contract fleet, delivery,
            distribution and storage in Saudi Arabia, for individuals and businesses.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {contact.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex items-center gap-2 font-semibold text-white/85 hover:text-accent">
                  <Icon name={c.icon} className="h-4 w-4 text-accent" /> {c.label}
                </a>
              </li>
            ))}
            {site.address && <li>{site.address}</li>}
            {site.hours && <li>{site.hours}</li>}
            {site.socialProfiles.map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noopener noreferrer me" className="hover:text-accent">
                  {new URL(u).hostname.replace("www.", "")}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Taxi and cab">
          <p className={head}>Taxi &amp; Cab</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link href={BASE} className={`${link} font-semibold text-accent`}>All of Saudi Arabia</Link></li>
            <li><Link href="/umrah-hajj-taxi" className={`${link} font-semibold text-accent`}>Umrah &amp; Hajj taxi</Link></li>
            {cities.slice(0, 8).map((c) => (
              <li key={c.id}><Link href={cityHref(BASE, c)} className={link}>{c.name}</Link></li>
            ))}
            <li><Link href={`${BASE}/routes`} className={link}>Intercity routes</Link></li>
            <li><Link href={`${BASE}#regions`} className={link}>All regions</Link></li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <p className={head}>Services</p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {groups.map((g) => (
              <div key={g.id}>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/45">{g.label}</p>
                <ul className="mt-2.5 space-y-2 text-sm">
                  {services.filter((s) => s.group === g.id).map((s) => (
                    <li key={s.slug}><Link href={`/services/${s.slug}`} className={link}>{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <nav aria-label="Company">
          <p className={head}>Company</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link href="/about" className={link}>About Us</Link></li>
            <li><Link href="/services" className={link}>All Services</Link></li>
            <li><Link href="/contact" className={link}>Contact Us</Link></li>
            <li><Link href="/#quote" className={link}>Request a quote</Link></li>
            <li><Link href="/privacy-policy" className={link}>Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className={link}>Terms &amp; Conditions</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>Serving Saudi Arabia. Fares, journey times and availability are confirmed for each request.</p>
        </div>
      </div>
    </footer>
  );
}
