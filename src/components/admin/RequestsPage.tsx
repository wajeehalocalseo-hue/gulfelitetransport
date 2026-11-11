"use client";

import { useMemo, useState } from "react";
import { ago, dayKey, download, fmtDate, followUpState, isRide, PRIORITIES, pri, priorityRank, STATUSES, toCsv } from "@/lib/admin-stats";
import type { QuoteStatus } from "@/lib/supabase";
import { useAdmin } from "./AdminProvider";
import { btn, btnDark, field, PageHead, Pill, priorityTone, statusTone } from "./ui";

const PAGE = 25;
type Sort = "newest" | "oldest" | "priority" | "amount" | "followup";

export default function RequestsPage() {
  const { rows, loading, reload, patch, remove, now, openRequest } = useAdmin();
  const [status, setStatus] = useState<QuoteStatus | "all" | "active">("active");
  const [priority, setPriority] = useState("");
  const [service, setService] = useState("");
  const [kind, setKind] = useState<"" | "ride" | "service">("");
  const [assignee, setAssignee] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [due, setDue] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState("");

  const services = useMemo(() => [...new Set(rows.map((r) => r.service))].sort(), [rows]);
  const people = useMemo(() => [...new Set(rows.map((r) => r.assigned_to).filter(Boolean) as string[])].sort(), [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = rows.filter((r) => {
      if (status === "active" ? !["new", "contacted", "quoted"].includes(r.status) : status !== "all" && r.status !== status) return false;
      if (priority && pri(r) !== priority) return false;
      if (service && r.service !== service) return false;
      if (kind && (kind === "ride") !== isRide(r)) return false;
      if (assignee && (assignee === "__none" ? r.assigned_to : r.assigned_to !== assignee)) return false;
      const d = dayKey(r.created_at);
      if (from && d < from) return false;
      if (to && d > to) return false;
      if (due && !["overdue", "today"].includes(followUpState(r, now) ?? "")) return false;
      if (needle && ![r.name, r.business, r.phone, r.email, r.service, r.pickup, r.dropoff, r.details, r.internal_notes, r.page_path, r.assigned_to].some((v) => v?.toLowerCase().includes(needle))) return false;
      return true;
    });
    const t = (r: (typeof rows)[number]) => new Date(r.created_at).getTime();
    list.sort((a, b) =>
      sort === "oldest" ? t(a) - t(b)
      : sort === "priority" ? priorityRank[pri(b)] - priorityRank[pri(a)] || t(b) - t(a)
      : sort === "amount" ? (Number(b.quote_amount) || 0) - (Number(a.quote_amount) || 0)
      : sort === "followup" ? (a.follow_up_at ?? "9999").localeCompare(b.follow_up_at ?? "9999")
      : t(b) - t(a),
    );
    return list;
  }, [rows, now, status, priority, service, kind, assignee, from, to, due, q, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const cur = Math.min(page, pages - 1);
  const shown = filtered.slice(cur * PAGE, cur * PAGE + PAGE);
  const counts = (s: string) => (s === "all" ? rows.length : s === "active" ? rows.filter((r) => ["new", "contacted", "quoted"].includes(r.status)).length : rows.filter((r) => r.status === s).length);
  const selected = [...picked].filter((id) => rows.some((r) => r.id === id));
  const allOnPage = shown.length > 0 && shown.every((r) => picked.has(r.id));

  const reset = (fn: () => void) => { fn(); setPage(0); };
  const attempt = async (fn: () => Promise<void>) => {
    setNotice("");
    try {
      await fn();
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Something went wrong.");
    }
  };
  const toggle = (id: string) => setPicked((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-5 py-8">
      <PageHead title="Requests" sub={`${filtered.length} of ${rows.length} shown`}>
        <button onClick={() => void reload()} className={btn}>{loading ? "Loading..." : "Refresh"}</button>
        <button onClick={() => download(`requests-${dayKey(Date.now())}.csv`, toCsv(filtered))} className={btn}>Export filtered (CSV)</button>
      </PageHead>

      <div className="flex flex-wrap gap-2">
        {(["active", "all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => reset(() => setStatus(s))}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ring-1 ${status === s ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-navy/15 hover:bg-accent/20"}`}
          >
            {s} <span className="opacity-70">{counts(s)}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-2 rounded-2xl border border-navy/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <input value={q} onChange={(e) => reset(() => setQ(e.target.value))} type="search" placeholder="Search name, phone, route, notes..." className={`${field} sm:col-span-2`} />
        <select value={service} onChange={(e) => reset(() => setService(e.target.value))} className={field} aria-label="Service">
          <option value="">All services</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={kind} onChange={(e) => reset(() => setKind(e.target.value as never))} className={field} aria-label="Type">
          <option value="">Rides and services</option>
          <option value="ride">Taxi rides only</option>
          <option value="service">Other services only</option>
        </select>
        <select value={priority} onChange={(e) => reset(() => setPriority(e.target.value))} className={field} aria-label="Priority">
          <option value="">Any priority</option>
          {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={assignee} onChange={(e) => reset(() => setAssignee(e.target.value))} className={field} aria-label="Assigned to">
          <option value="">Anyone</option>
          <option value="__none">Unassigned</option>
          {people.map((p) => <option key={p}>{p}</option>)}
        </select>
        <label className="flex items-center gap-2 text-xs font-bold text-muted">From <input type="date" value={from} onChange={(e) => reset(() => setFrom(e.target.value))} className={`${field} flex-1`} /></label>
        <label className="flex items-center gap-2 text-xs font-bold text-muted">To <input type="date" value={to} onChange={(e) => reset(() => setTo(e.target.value))} className={`${field} flex-1`} /></label>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={field} aria-label="Sort">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="priority">Highest priority</option>
          <option value="amount">Highest quote</option>
          <option value="followup">Follow-up date</option>
        </select>
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input type="checkbox" checked={due} onChange={(e) => reset(() => setDue(e.target.checked))} /> Follow-up due
        </label>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-navy p-3 text-white">
          <span className="px-2 text-sm font-bold">{selected.length} selected</span>
          <select aria-label="Set status" defaultValue="" onChange={(e) => { const v = e.target.value as QuoteStatus; e.target.value = ""; if (v) void attempt(() => patch(selected, { status: v })); }} className={`${field} py-1.5`}>
            <option value="" disabled>Set status...</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select aria-label="Set priority" defaultValue="" onChange={(e) => { const v = e.target.value; e.target.value = ""; if (v) void attempt(() => patch(selected, { priority: v as never })); }} className={`${field} py-1.5`}>
            <option value="" disabled>Set priority...</option>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <button onClick={() => download("requests-selected.csv", toCsv(rows.filter((r) => picked.has(r.id))))} className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-navy">Export</button>
          <button
            onClick={() => window.confirm(`Delete ${selected.length} request(s) permanently?`) && void attempt(async () => { await remove(selected); setPicked(new Set()); })}
            className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-bold text-white"
          >
            Delete
          </button>
          <button onClick={() => setPicked(new Set())} className="ml-auto px-3 text-sm font-semibold underline">Clear</button>
        </div>
      )}
      {notice && <p role="alert" className="text-sm text-red-700">{notice}</p>}

      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
        <div className="hidden items-center gap-3 border-b border-navy/10 bg-surface px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-muted md:flex">
          <input type="checkbox" aria-label="Select all on this page" checked={allOnPage} onChange={() => setPicked((s) => { const n = new Set(s); shown.forEach((r) => (allOnPage ? n.delete(r.id) : n.add(r.id))); return n; })} />
          <span className="w-56">Customer</span>
          <span className="flex-1">Request</span>
          <span className="w-24">Status</span>
          <span className="w-20">Priority</span>
          <span className="w-28 text-right">Received</span>
        </div>
        {shown.length === 0 ? (
          <p className="p-10 text-center text-muted">{rows.length ? "No requests match these filters." : "No requests yet."}</p>
        ) : (
          <ul className="divide-y divide-navy/10">
            {shown.map((r) => {
              const f = followUpState(r);
              return (
                <li key={r.id} className={`flex items-center gap-3 px-4 py-3 ${r.status === "new" ? "bg-accent/10" : ""}`}>
                  <input type="checkbox" aria-label={`Select ${r.name}`} checked={picked.has(r.id)} onChange={() => toggle(r.id)} />
                  <button onClick={() => openRequest(r.id)} className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-left md:flex-nowrap">
                    <span className="w-full min-w-0 md:w-56">
                      <span className="block truncate font-extrabold text-navy">{r.name}</span>
                      <span className="block truncate text-xs text-muted">{r.phone}{r.assigned_to ? ` · ${r.assigned_to}` : ""}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-navy">{isRide(r) ? "Ride" : r.service}{r.pickup && r.dropoff ? `: ${r.pickup} → ${r.dropoff}` : ""}</span>
                      <span className="block truncate text-xs text-muted">
                        {r.quote_amount ? `SAR ${r.quote_amount} · ` : ""}
                        {f === "overdue" ? "Follow-up overdue" : f === "today" ? "Follow-up today" : r.details}
                      </span>
                    </span>
                    <span className="w-24"><Pill className={statusTone[r.status]}>{r.status}</Pill></span>
                    <span className="w-20"><Pill className={priorityTone[pri(r)]}>{pri(r)}</Pill></span>
                    <span className="w-28 text-xs text-muted md:text-right" title={fmtDate(r.created_at)}>{ago(r.created_at)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button disabled={cur === 0} onClick={() => setPage(cur - 1)} className={btn}>Previous</button>
          <span className="text-sm text-muted">Page {cur + 1} of {pages}</span>
          <button disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)} className={btnDark}>Next</button>
        </div>
            )}
    </div>
  );
}
