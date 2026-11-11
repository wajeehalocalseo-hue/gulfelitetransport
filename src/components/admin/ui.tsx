import type { ReactNode } from "react";
import type { Priority, QuoteStatus } from "@/lib/supabase";
import type { Count } from "@/lib/admin-stats";

export const statusTone: Record<QuoteStatus, string> = {
  new: "bg-accent text-navy",
  contacted: "bg-sky-100 text-sky-900",
  quoted: "bg-violet-100 text-violet-900",
  won: "bg-green-100 text-green-900",
  lost: "bg-slate-200 text-slate-700",
  spam: "bg-red-100 text-red-800",
};
export const priorityTone: Record<Priority, string> = {
  low: "bg-slate-100 text-slate-600",
  normal: "bg-slate-100 text-slate-600",
  high: "bg-orange-100 text-orange-900",
  urgent: "bg-red-600 text-white",
};

export function Pill({ className, children }: { className: string; children: ReactNode }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${className}`}>{children}</span>;
}

export function Card({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-navy/10 bg-white p-5 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-extrabold text-navy">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, sub, tone = "" }: { label: string; value: ReactNode; sub?: ReactNode; tone?: string }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold text-navy ${tone}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

export function PageHead({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export const btn = "rounded-full border border-navy/20 bg-white px-4 py-2 text-sm font-bold text-navy transition hover:bg-accent/20 disabled:opacity-50";
export const btnDark = "rounded-full bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-navy-2 disabled:opacity-50";
export const field = "rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

/** Vertical bar chart (SVG, scales to its container). Shows the label under every nth bar. */
export function BarChart({ data, every = 1, height = 160, color = "currentColor", fmt = (v: number) => String(v) }: { data: Count[]; every?: number; height?: number; color?: string; fmt?: (v: number) => string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const w = 100 / Math.max(1, data.length);
  return (
    <div>
      <svg viewBox={`0 0 100 ${height / 4}`} preserveAspectRatio="none" role="img" aria-label="Bar chart" className="w-full text-navy" style={{ height }}>
        {data.map((d, i) => {
          const h = (d.value / max) * (height / 4 - 2);
          return (
            <g key={d.label + i}>
              <title>{`${d.label}: ${fmt(d.value)}`}</title>
              <rect x={i * w + w * 0.12} y={height / 4 - h} width={w * 0.76} height={h} rx="0.6" fill={color} opacity={d.value ? 1 : 0.12} />
            </g>
          );
        })}
      </svg>
      <div className="mt-1 flex text-[10px] text-muted">
        {data.map((d, i) => (
          <span key={d.label + i} className="flex-1 text-center">{i % every === 0 ? d.label.slice(every > 3 ? 5 : 0) : ""}</span>
        ))}
      </div>
    </div>
  );
}

/** Ranked horizontal bars. */
export function RankList({ data, empty = "No data yet." }: { data: Count[]; empty?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <ul className="grid gap-2.5">
      {data.map((d) => (
        <li key={d.label}>
          <div className="flex justify-between gap-3 text-sm">
            <span className="truncate font-semibold text-navy">{d.label}</span>
            <span className="tabular-nums text-muted">{d.value}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-navy/10">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
