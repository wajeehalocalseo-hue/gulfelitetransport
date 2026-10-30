import Link from "next/link";
import Icon from "./Icon";
import ServiceImage from "./ServiceImage";
import { groups, type Service } from "@/content/services";

/** Scannable service card: image, title, short description, two benefits and clear actions. */
export default function ServiceCard({ s, headingLevel = 3 }: { s: Service; headingLevel?: 2 | 3 | 4 }) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  const group = groups.find((g) => g.id === s.group)?.label;

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        <ServiceImage
          slug={s.slug}
          title={s.title}
          className="h-full w-full transition duration-500 group-hover:scale-[1.03]"
        />
        {group && (
          <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            {group}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Heading className="text-xl font-extrabold leading-snug text-navy">
          <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 hover:text-navy-2">
            <span className="relative">{s.title}</span>
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{s.short}</p>
        <ul className="mt-4 space-y-1.5">
          {s.benefits.slice(0, 2).map((b) => (
            <li key={b} className="flex gap-2 text-sm font-medium text-navy">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {b}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          <span className="font-bold text-navy">Best for:</span> {s.audienceShort}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-navy">
            View details <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
          <Link
            href={`/services/${s.slug}#quote`}
            className="relative z-10 rounded-full bg-accent px-4 py-2 text-sm font-bold text-navy hover:brightness-95"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
