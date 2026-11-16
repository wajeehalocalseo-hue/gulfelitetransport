import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";
import { cities } from "@/content/saudi/cities";
import { cityHref } from "@/content/saudi/paths";
import { routes } from "@/content/saudi/places";
import { groups, services } from "@/content/services";
import { site, telUrl, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";

const BASE = "/taxi-saudi-arabia";
const head = "text-sm font-extrabold uppercase tracking-[0.14em] text-white";
const link = "text-white/70 transition hover:text-accent";
const cityName = (id: string) => cities.find((c) => c.id === id)?.name ?? id;

/** The Riyadh routes people ask about most, in the order they are listed in the footer. */
const POPULAR = ["riyadh-to-jeddah", "riyadh-to-makkah", "riyadh-to-madinah", "riyadh-to-dammam", "riyadh-to-taif", "riyadh-to-al-khobar"];

export default function SiteFooter() {
  const wa = whatsappUrl("Hello, I would like to request a ride.");
  // Contact tiles show only the details that exist in site.ts, so nothing in the footer is a dead end.
  const tiles = [
    site.address && { icon: "building", label: "Address", value: site.address, href: undefined as string | undefined },
    telUrl && { icon: "phone", label: "Phone", value: site.phone, href: telUrl },
    wa && { icon: "chat", label: "WhatsApp", value: "Message us", href: wa },
    site.email && { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    site.hours && { icon: "calendar", label: "Hours", value: site.hours, href: undefined as string | undefined },
  ].filter(Boolean) as { icon: string; label: string; value: string; href?: string }[];

  return (
    <footer className="bg-[#0a2018] pb-24 text-white/70 md:pb-0">
      {/* Call-to-action band */}
      <div className="border-b border-white/10 bg-gradient-to-r from-navy to-navy-2">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Need a ride or a transport quote?</p>
            <p className="mt-1 max-w-2xl text-white/70">Tell us where and what. We confirm the vehicle, driver and fare before you commit.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-extrabold text-[#06391f] transition hover:brightness-95">
                <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
              </a>
            )}
            <Link href="/#quote" className={wa ? "rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition hover:border-accent hover:text-accent" : "rounded-full bg-accent px-7 py-3.5 font-extrabold text-navy transition hover:brightness-95"}>
              {wa ? "Booking Form" : "Request a Ride or Quote"}
            </Link>
            <Link href={BASE} className="rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition hover:border-accent hover:text-accent">
              Find Your City
            </Link>
          </div>
        </div>
      </div>

      {/* Brand and contact */}
      <div className="mx-auto max-w-7xl px-5 pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-start">
          <div>
            <Link href="/" aria-label="Gulf Elite Transport, home" className="inline-block rounded-lg">
              <Logo tone="dark" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7">
              Taxi and cab rides, freight and cargo, passenger transport, equipment moving, contract fleet, delivery,
              distribution and storage in Saudi Arabia, for individuals and businesses.
            </p>
            {site.socialProfiles.length > 0 && (
              <ul className="mt-5 flex gap-3" aria-label="Social profiles">
                {site.socialProfiles.map((u) => (
                  <li key={u}>
                    <a href={u} target="_blank" rel="noopener noreferrer me" aria-label={new URL(u).hostname.replace("www.", "")} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent hover:text-navy">
                      <Icon name="globe" className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {site.certifications.map((c) => (
              <li key={c} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-navy"><Icon name="shield" className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white/50">Compliance</span>
                  <span className="block font-bold text-white">{c}</span>
                </span>
              </li>
            ))}
            {tiles.length === 0 && (
              <li className="sm:col-span-2">
                <Link href="/contact" className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:ring-accent">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-navy"><Icon name="mail" className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/50">Get in touch</span>
                    <span className="block font-bold text-white">Contact us or send a ride request</span>
                  </span>
                </Link>
              </li>
            )}
            {tiles.map((t) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-navy"><Icon name={t.icon} className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/50">{t.label}</span>
                    <span className="block break-words font-bold text-white">{t.value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10";
              return (
                <li key={t.label}>
                  {t.href ? (
                    <a href={t.href} {...(t.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} transition hover:ring-accent`}>{inner}</a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Link lists */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.7fr_0.8fr]">
        <nav aria-label="Service areas">
          <p className={head}>Service Areas</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link href="/riyadh-taxi-service" className={`${link} font-semibold text-accent`}>Riyadh Taxi Service</Link></li>
            <li><Link href="/umrah-hajj-taxi" className={`${link} font-semibold text-accent`}>Umrah &amp; Hajj taxi</Link></li>
            {cities.filter((c) => c.id !== "riyadh").slice(0, 8).map((c) => (
              <li key={c.id}><Link href={cityHref(BASE, c)} className={link}>{c.name}</Link></li>
            ))}
            <li><Link href={BASE} className={link}>All locations</Link></li>
          </ul>
        </nav>

        <nav aria-label="Popular routes">
          <p className={head}>Popular Routes</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {POPULAR.map((id) => {
              const r = routes.find((x) => x.id === id);
              return r ? <li key={id}><Link href={`${BASE}/routes/${id}`} className={link}>{cityName(r.from)} to {cityName(r.to)}</Link></li> : null;
            })}
            <li><Link href={`${BASE}/routes`} className={`${link} font-semibold text-accent`}>All intercity routes</Link></li>
            <li><Link href={`${BASE}/international`} className={`${link} font-semibold text-accent`}>International routes</Link></li>
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
            <li><Link href="/fleet" className={link}>Our Fleet</Link></li>
            <li><Link href="/blog" className={link}>Blog</Link></li>
            <li><Link href="/services" className={link}>All Services</Link></li>
            <li><Link href="/contact" className={link}>Contact Us</Link></li>
            <li><Link href="/book" className={link}>Book a ride</Link></li>
            <li><Link href="/#quote" className={link}>Request a quote</Link></li>
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li><Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-accent">Terms &amp; Conditions</Link></li>
            <li>Fares, journey times and availability are confirmed for each request.</li>
          </ul>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-extrabold text-navy hover:brightness-95">
              <Icon name="chat" className="h-4 w-4" /> Book via WhatsApp
            </a>
          ) : (
            <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-extrabold text-navy hover:brightness-95">
              Book a ride
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
