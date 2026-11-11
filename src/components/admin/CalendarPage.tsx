"use client";

import { useMemo, useState } from "react";
import { calendarItems, dayKey, isRide, pri } from "@/lib/admin-stats";
import { useAdmin } from "./AdminProvider";
import { btn, btnDark, PageHead, Pill, priorityTone } from "./ui";

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const key = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** Month calendar of customers' preferred pickup dates and your follow-up dates. */
export default function CalendarPage() {
  const { rows, openRequest, now } = useAdmin();
  const today = dayKey(now);
  const [cursor, setCursor] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [layers, setLayers] = useState({ pickup: true, followup: true });

  const [ty, tm] = today.split("-").map(Number);
  const view = cursor ?? { y: ty, m: tm - 1 };
  const sel = selected ?? today;

  const items = useMemo(() => calendarItems(rows), [rows]);
  const byDay = useMemo(() => {
    const m = new Map<string, typeof items>();
    for (const i of items) {
      if (!layers[i.kind]) continue;
      m.set(i.day, [...(m.get(i.day) ?? []), i]);
    }
    return m;
  }, [items, layers]);

  const first = new Date(Date.UTC(view.y, view.m, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((lead + days) / 7) * 7 }, (_, i) => (i < lead || i >= lead + days ? null : i - lead + 1));
  const title = first.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
  const shift = (n: number) => {
    const d = new Date(Date.UTC(view.y, view.m + n, 1));
    setCursor({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };
  const dayItems = byDay.get(sel) ?? [];
  const upcoming = [...byDay.entries()].filter(([d]) => d >= today).sort(([a], [b]) => a.localeCompare(b)).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-5 py-8">
      <PageHead title="Calendar" sub="Pickup dates customers asked for, and your follow-ups.">
        <button onClick={() => setLayers((l) => ({ ...l, pickup: !l.pickup }))} aria-pressed={layers.pickup} className={layers.pickup ? btnDark : btn}>Pickups</button>
        <button onClick={() => setLayers((l) => ({ ...l, followup: !l.followup }))} aria-pressed={layers.followup} className={layers.followup ? btnDark : btn}>Follow-ups</button>
      </PageHead>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-navy">{title}</h2>
            <div className="flex gap-2">
              <button onClick={() => shift(-1)} className={btn} aria-label="Previous month">&larr;</button>
              <button onClick={() => { setCursor(null); setSelected(today); }} className={btn}>Today</button>
              <button onClick={() => shift(1)} className={btn} aria-label="Next month">&rarr;</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-navy/10 text-xs">
            {WEEK.map((w) => <div key={w} className="bg-surface py-2 text-center font-bold uppercase text-muted">{w}</div>)}
            {cells.map((d, i) => {
              if (d === null) return <div key={`e${i}`} className="min-h-24 bg-surface" />;
              const k = key(view.y, view.m, d);
              const list = byDay.get(k) ?? [];
              return (
                <button
                  key={k}
                  onClick={() => setSelected(k)}
                  aria-label={`${k}: ${list.length} items`}
                  className={`min-h-24 bg-white p-1.5 text-left align-top transition hover:bg-accent/10 ${sel === k ? "ring-2 ring-inset ring-accent" : ""}`}
                >
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${k === today ? "bg-accent text-navy" : "text-navy"}`}>{d}</span>
                  <span className="mt-1 grid gap-0.5">
                    {list.slice(0, 3).map((x) => (
                      <span key={x.id} className={`truncate rounded px-1 py-0.5 text-[10px] font-semibold ${x.kind === "pickup" ? "bg-accent/25 text-navy" : "bg-sky-100 text-sky-900"}`}>
                        {x.kind === "followup" ? "↻ " : ""}{x.r.name}
                      </span>
                    ))}
                    {list.length > 3 && <span className="text-[10px] font-bold text-muted">+{list.length - 3} more</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted"><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-accent" /> pickup date &nbsp; <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-sky-300" /> follow-up</p>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base font-extrabold text-navy">{new Date(`${sel}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })}</h2>
            {dayItems.length === 0 ? (
              <p className="text-sm text-muted">Nothing scheduled.</p>
            ) : (
              <ul className="divide-y divide-navy/10">
                {dayItems.map((i) => (
                  <li key={i.id}>
                    <button onClick={() => openRequest(i.r.id)} className="flex w-full items-center justify-between gap-3 py-2.5 text-left">
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-navy">{i.r.name}</span>
                        <span className="block truncate text-xs text-muted">{i.kind === "followup" ? "Follow-up" : "Pickup"} · {isRide(i.r) ? "Ride" : i.r.service}{i.r.pickup && i.r.dropoff ? `: ${i.r.pickup} → ${i.r.dropoff}` : ""}</span>
                      </span>
                      <Pill className={priorityTone[pri(i.r)]}>{pri(i.r)}</Pill>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base font-extrabold text-navy">Coming up</h2>
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted">No upcoming dates. Add a follow-up date in a request.</p>
            ) : (
              <ul className="grid gap-2">
                {upcoming.map(([d, list]) => (
                  <li key={d}>
                    <button
                      onClick={() => {
                        setSelected(d);
                        const [y, m] = d.split("-").map(Number);
                        setCursor({ y, m: m - 1 });
                      }}
                      className="flex w-full justify-between text-left text-sm"
                    >
                      <span className="font-semibold text-navy">{d}{d === today ? " (today)" : ""}</span>
                      <span className="text-muted">{list.length} item{list.length > 1 ? "s" : ""}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
