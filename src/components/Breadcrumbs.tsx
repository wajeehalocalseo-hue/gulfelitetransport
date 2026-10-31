import Link from "next/link";

export default function Breadcrumbs({
  items,
  tone = "dark",
  center = false,
}: {
  items: { name: string; href?: string }[];
  /** "dark" for use on a navy background, "light" on a light one. */
  tone?: "dark" | "light";
  center?: boolean;
}) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-muted" : "text-white/70"}`}>
      <ol className={`flex flex-wrap items-center gap-2 ${center ? "justify-center" : ""}`}>
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className={light ? "hover:text-navy" : "hover:text-accent"}>
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className={light ? "font-semibold text-navy" : "text-white"}>
                {it.name}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
