import Link from "next/link";
import Icon from "./Icon";
import ServiceImage from "./ServiceImage";
import type { ServiceNode } from "@/content/taxonomy";

/** Card for a Level 2 / Level 3 service, used on parent pages and in related lists. */
export default function SubServiceCard({
  node,
  headingLevel = 3,
}: {
  node: ServiceNode;
  headingLevel?: 2 | 3 | 4;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="relative aspect-[16/9] overflow-hidden bg-navy">
        <ServiceImage
          slug={node.slug}
          sceneSlug={node.image.sceneSlug}
          flip={node.order % 2 === 0}
          title={node.name}
          className="h-full w-full transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="text-lg font-extrabold leading-snug text-navy">
          <Link href={node.fullUrl} className="after:absolute after:inset-0">
            <span className="relative">{node.name}</span>
          </Link>
        </Heading>
        <p className="mt-2 text-sm leading-6 text-muted">{node.shortDescription}</p>
        <p className="mt-3 text-xs text-muted">
          <span className="font-bold text-navy">Who needs it:</span> {node.audienceShort}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-navy">
            View details <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
          <Link
            href={`${node.fullUrl}#quote`}
            className="relative z-10 rounded-full bg-accent px-4 py-2 text-sm font-bold text-navy hover:brightness-95"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
