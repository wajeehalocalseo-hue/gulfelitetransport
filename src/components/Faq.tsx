import Icon from "./Icon";
import type { Faq } from "@/content/services";

export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-navy">
            <h3 className="text-base font-semibold sm:text-lg">{f.q}</h3>
            <Icon
              name="chevron"
              className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 leading-7 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
