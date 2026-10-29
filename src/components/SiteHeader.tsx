import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="text-lg font-bold text-brand dark:text-accent">
          {site.name}
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden hover:text-brand sm:inline">
              {l.label}
            </Link>
          ))}
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="rounded-full bg-brand px-4 py-2 text-white hover:bg-brand/90"
          >
            Call Now
          </a>
        </div>
      </nav>
    </header>
  );
}
