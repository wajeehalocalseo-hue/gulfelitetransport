import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHero({
  crumbs,
  h1,
  lead,
  children,
  aside,
}: {
  crumbs: { name: string; href?: string }[];
  h1: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="bg-navy text-white">
      <div
        className={`mx-auto max-w-7xl px-5 py-14 sm:py-20 ${aside ? "grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]" : ""}`}
      >
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {h1}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
