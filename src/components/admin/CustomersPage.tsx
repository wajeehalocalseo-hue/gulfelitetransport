"use client";

import { useMemo, useState } from "react";
import { ago, groupCustomers, isRide, money, waNumber } from "@/lib/admin-stats";
import { useAdmin } from "./AdminProvider";
import { PageHead, Pill, field, statusTone } from "./ui";

type Sort = "recent" | "requests" | "value";

/** Everyone who has contacted you, grouped by phone or email, with their history. */
export default function CustomersPage() {
  const { rows, openRequest, now } = useAdmin();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [repeat, setRepeat] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const all = useMemo(() => groupCustomers(rows), [rows]);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return all
      .filter((c) => (!repeat || c.requests.length > 1) && (!needle || [c.name, c.phone, c.email].some((v) => v.toLowerCase().includes(needle))))
      .sort((a, b) => (sort === "requests" ? b.requests.length - a.requests.length : sort === "value" ? b.wonValue - a.wonValue : b.last.localeCompare(a.last)));
  }, [all, q, sort, repeat]);

  const repeatCount = all.filter((c) => c.requests.length > 1).length;

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-5 py-8">
      <PageHead title="Customers" sub={`${all.length} people · ${repeatCount} repeat (more than one request). Spam is excluded.`} />
      <div className="flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search name, phone or email..." className={`${field} w-full sm:w-80`} />
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={field} aria-label="Sort">
          <option value="recent">Most recent</option>
          <option value="requests">Most requests</option>
          <option value="value">Highest won value</option>
        </select>
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} /> Repeat customers only
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
        {list.length === 0 ? (
          <p className="p-10 text-center text-muted">No customers yet.</p>
        ) : (
          <ul className="divide-y divide-navy/10">
            {list.map((c) => {
              const isOpen = open === c.key;
              return (
                <li key={c.key}>
                  <button onClick={() => setOpen(isOpen ? null : c.key)} aria-expanded={isOpen} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-left">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-extrabold text-navy">{c.name}{c.requests.length > 1 && <span className="ml-2 align-middle"><Pill className="bg-violet-100 text-violet-900">repeat</Pill></span>}</span>
                      <span className="block truncate text-xs text-muted">{c.phone} · {c.email}</span>
                    </span>
                    <span className="w-24 text-sm text-navy"><b>{c.requests.length}</b> <span className="text-muted">request{c.requests.length > 1 ? "s" : ""}</span></span>
                    <span className="w-28 text-sm text-navy">{c.won ? <><b>{c.won}</b> <span className="text-muted">won</span>{c.wonValue ? ` · ${money(c.wonValue)}` : ""}</> : <span className="text-muted">no wins yet</span>}</span>
                    <span className="w-24 text-right text-xs text-muted">{ago(c.last, now)}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-navy/10 bg-surface px-4 py-3">
                      <div className="mb-3 flex flex-wrap gap-2 text-sm">
                        <a href={`tel:${c.phone}`} className="rounded-full bg-navy px-4 py-1.5 font-bold text-white">Call</a>
                        <a href={`https://wa.me/${waNumber(c.phone)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-4 py-1.5 font-bold text-white">WhatsApp</a>
                        <a href={`mailto:${c.email}`} className="rounded-full border border-navy/20 px-4 py-1.5 font-bold text-navy">Email</a>
                      </div>
                      <ul className="divide-y divide-navy/10 rounded-xl border border-navy/10 bg-white">
                        {c.requests.map((r) => (
                          <li key={r.id}>
                            <button onClick={() => openRequest(r.id)} className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm">
                              <span className="min-w-0 truncate text-navy">{isRide(r) ? "Ride" : r.service}{r.pickup && r.dropoff ? `: ${r.pickup} → ${r.dropoff}` : ""}{r.quote_amount ? ` · SAR ${r.quote_amount}` : ""}</span>
                              <Pill className={statusTone[r.status]}>{r.status}</Pill>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
