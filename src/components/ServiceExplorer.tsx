"use client";

import { useState, type ReactNode } from "react";

type Filter = { id: string; label: string; count: number };
type Card = { slug: string; group: string; node: ReactNode };

/**
 * Category filter for the service cards. Every card stays in the page HTML (so search engines
 * and assistants can read all services); filtering only hides cards visually.
 */
export default function ServiceExplorer({ filters, cards }: { filters: Filter[]; cards: Card[] }) {
  const [active, setActive] = useState("all");

  return (
    <div>
      <div role="group" aria-label="Filter services by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => {
          const on = active === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-accent ${
                on ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/20 hover:ring-accent"
              }`}
            >
              {f.label} <span className={on ? "text-accent" : "text-muted"}>({f.count})</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <li key={c.slug} hidden={active !== "all" && active !== c.group} className="flex">
            {c.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
