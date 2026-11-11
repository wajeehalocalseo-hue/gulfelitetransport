"use client";

import { useState } from "react";
import { ago, isRide, money, pri } from "@/lib/admin-stats";
import type { QuoteStatus } from "@/lib/supabase";
import { useAdmin } from "./AdminProvider";
import { PageHead, Pill, priorityTone, statusTone } from "./ui";

const COLUMNS: { status: QuoteStatus; hint: string }[] = [
  { status: "new", hint: "Not answered yet" },
  { status: "contacted", hint: "Waiting for the customer" },
  { status: "quoted", hint: "Price sent" },
  { status: "won", hint: "Booked" },
  { status: "lost", hint: "Did not go ahead" },
];

/** Pipeline board: drag a card to another column to change its status. */
export default function BoardPage() {
  const { rows, patch, openRequest, now } = useAdmin();
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<QuoteStatus | null>(null);
  const [notice, setNotice] = useState("");

  const move = async (id: string, status: QuoteStatus) => {
    const r = rows.find((x) => x.id === id);
    if (!r || r.status === status) return;
    setNotice("");
    try {
      await patch([id], { status });
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Could not move the card.");
    }
  };

  return (
    <div className="space-y-5 px-5 py-8">
      <PageHead title="Board" sub="Drag a card to another column to update its status. On a phone, open a card and change the status there." />
      {notice && <p role="alert" className="text-sm text-red-700">{notice}</p>}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((c) => {
          const list = rows.filter((r) => r.status === c.status).sort((a, b) => b.created_at.localeCompare(a.created_at));
          const total = list.reduce((a, r) => a + (Number(r.quote_amount) || 0), 0);
          return (
            <section
              key={c.status}
              aria-label={c.status}
              onDragOver={(e) => { e.preventDefault(); setOver(c.status); }}
              onDragLeave={() => setOver((o) => (o === c.status ? null : o))}
              onDrop={() => { if (drag) void move(drag, c.status); setDrag(null); setOver(null); }}
              className={`flex w-72 shrink-0 flex-col rounded-2xl border p-3 transition ${over === c.status ? "border-accent bg-accent/10" : "border-navy/10 bg-white"}`}
            >
              <header className="mb-3 flex items-start justify-between gap-2 px-1">
                <div>
                  <h2 className="text-sm font-extrabold capitalize text-navy">{c.status} <span className="font-normal text-muted">{list.length}</span></h2>
                  <p className="text-xs text-muted">{c.hint}</p>
                </div>
                {total > 0 && <span className="text-xs font-bold text-navy">{money(total)}</span>}
              </header>
              <ul className="grid max-h-[70vh] gap-2 overflow-y-auto">
                {list.length === 0 && <li className="rounded-lg border border-dashed border-navy/20 p-4 text-center text-xs text-muted">Empty</li>}
                {list.map((r) => (
                  <li key={r.id}>
                    <button
                      draggable
                      onDragStart={() => setDrag(r.id)}
                      onDragEnd={() => { setDrag(null); setOver(null); }}
                      onClick={() => openRequest(r.id)}
                      className="w-full cursor-grab rounded-xl border border-navy/10 bg-surface p-3 text-left shadow-sm transition hover:border-accent active:cursor-grabbing"
                    >
                      <span className="flex items-start justify-between gap-2">
                        <span className="min-w-0 truncate font-extrabold text-navy">{r.name}</span>
                        <Pill className={priorityTone[pri(r)]}>{pri(r)}</Pill>
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted">{isRide(r) ? "Ride" : r.service}{r.pickup && r.dropoff ? `: ${r.pickup} → ${r.dropoff}` : ""}</span>
                      <span className="mt-2 flex items-center justify-between text-xs text-muted">
                        <span>{ago(r.created_at, now)}</span>
                        {r.quote_amount ? <span className="font-bold text-navy">SAR {r.quote_amount}</span> : <Pill className={statusTone[r.status]}>{r.status}</Pill>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
