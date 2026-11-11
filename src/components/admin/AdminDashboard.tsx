"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminSession,
  adminSignOut,
  deleteQuote,
  listQuoteRequests,
  setQuoteStatus,
  type AdminSession,
  type QuoteRecord,
  type QuoteStatus,
} from "@/lib/supabase";

const STATUSES: QuoteStatus[] = ["new", "contacted", "quoted", "won", "lost", "spam"];
const tone: Record<QuoteStatus, string> = {
  new: "bg-accent text-navy",
  contacted: "bg-sky-100 text-sky-900",
  quoted: "bg-violet-100 text-violet-900",
  won: "bg-green-100 text-green-900",
  lost: "bg-slate-200 text-slate-700",
  spam: "bg-red-100 text-red-800",
};

type State = { kind: "loading" } | { kind: "out" } | { kind: "error"; message: string } | { kind: "ready"; session: AdminSession; rows: QuoteRecord[] };

const digits = (p: string) => p.replace(/[^\d]/g, "");
const when = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

export default function AdminDashboard() {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "loading" });
  const [filter, setFilter] = useState<QuoteStatus | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try {
      const session = await adminSession();
      if (!session) {
        setState({ kind: "out" });
        return;
      }
      setState({ kind: "ready", session, rows: await listQuoteRequests() });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not load requests.";
      setState(message.startsWith("Session expired") ? { kind: "out" } : { kind: "error", message });
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load after mount
    void load();
  }, [load]);

  useEffect(() => {
    if (state.kind === "out") router.replace("/admin/login");
  }, [state.kind, router]);

  const rows = useMemo(() => (state.kind === "ready" ? state.rows : []), [state]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const s of STATUSES) c[s] = rows.filter((r) => r.status === s).length;
    return c;
  }, [rows]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (filter === "all" || r.status === filter) &&
        (!needle || [r.name, r.phone, r.email, r.service, r.pickup, r.dropoff, r.details].some((v) => v?.toLowerCase().includes(needle))),
    );
  }, [rows, filter, q]);

  async function changeStatus(id: string, status: QuoteStatus) {
    if (state.kind !== "ready") return;
    const previous = state.rows;
    setState({ ...state, rows: previous.map((r) => (r.id === id ? { ...r, status } : r)) });
    try {
      await setQuoteStatus(id, status);
    } catch (e) {
      setState({ ...state, rows: previous });
      setNotice(e instanceof Error ? e.message : "Could not update.");
    }
  }

  async function remove(id: string) {
    if (state.kind !== "ready" || !window.confirm("Delete this request permanently?")) return;
    try {
      await deleteQuote(id);
      setState({ ...state, rows: state.rows.filter((r) => r.id !== id) });
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Could not delete.");
    }
  }

  async function signOut() {
    await adminSignOut();
    router.push("/admin/login");
  }

  if (state.kind === "loading" || state.kind === "out") {
    return <p className="px-5 py-20 text-center text-muted">Loading...</p>;
  }
  if (state.kind === "error") {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <p role="alert" className="font-semibold text-red-700">{state.message}</p>
        <button onClick={signOut} className="mt-6 rounded-full bg-navy px-6 py-2.5 font-bold text-white">Sign out</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-navy">Requests</h1>
          <p className="text-sm text-muted">Signed in as {state.session.email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-full border border-navy/20 px-5 py-2 text-sm font-bold text-navy hover:bg-white">Refresh</button>
          <button onClick={signOut} className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white">Sign out</button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ring-1 ${filter === s ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-navy/15 hover:bg-accent/20"}`}
          >
            {s} <span className="opacity-70">{counts[s]}</span>
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="Search name, phone, route..."
          className="ml-auto w-full rounded-full border border-navy/20 bg-white px-4 py-2 text-sm sm:w-72"
        />
      </div>
      {notice && <p role="alert" className="mt-4 text-sm text-red-700">{notice}</p>}

      <ul className="mt-6 grid gap-3">
        {shown.length === 0 && <li className="rounded-xl bg-white p-8 text-center text-muted">No requests here yet.</li>}
        {shown.map((r) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id} className="rounded-xl border border-navy/10 bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-3 p-4">
                <button onClick={() => setOpen(isOpen ? null : r.id)} aria-expanded={isOpen} className="min-w-0 flex-1 text-left">
                  <span className="block font-extrabold text-navy">{r.name} <span className="font-normal text-muted">· {r.service}</span></span>
                  <span className="block truncate text-sm text-muted">
                    {r.pickup && r.dropoff ? `${r.pickup} → ${r.dropoff}` : r.details}
                  </span>
                  <span className="block text-xs text-muted">{when(r.created_at)}{r.page_path ? ` · from ${r.page_path}` : ""}</span>
                </button>
                <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${tone[r.status]}`}>{r.status}</span>
                <select
                  aria-label={`Status for ${r.name}`}
                  value={r.status}
                  onChange={(e) => changeStatus(r.id, e.target.value as QuoteStatus)}
                  className="rounded-lg border border-navy/20 bg-white px-2 py-1.5 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {isOpen && (
                <div className="border-t border-navy/10 p-4 text-sm">
                  <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {([
                      ["Phone", r.phone],
                      ["Email", r.email],
                      ["Business", r.business],
                      ["Topic", r.topic],
                      ["Pickup", r.pickup],
                      ["Drop-off / delivery", r.dropoff],
                      ["Preferred date", r.preferred_date],
                      ["Extra", r.extra],
                    ] as const).filter(([, v]) => v).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs font-bold uppercase tracking-wide text-muted">{k}</dt>
                        <dd className="break-words text-navy">{v}</dd>
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted">Details</dt>
                      <dd className="whitespace-pre-wrap break-words text-navy">{r.details}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={`tel:${r.phone}`} className="rounded-full bg-navy px-4 py-1.5 font-bold text-white">Call</a>
                    <a href={`https://wa.me/${digits(r.phone)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-4 py-1.5 font-bold text-white">WhatsApp</a>
                    <a href={`mailto:${r.email}`} className="rounded-full border border-navy/20 px-4 py-1.5 font-bold text-navy">Email</a>
                    <button onClick={() => remove(r.id)} className="ml-auto rounded-full px-4 py-1.5 font-bold text-red-700 hover:bg-red-50">Delete</button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
