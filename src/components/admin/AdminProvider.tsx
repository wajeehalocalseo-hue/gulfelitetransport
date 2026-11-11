"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  addEvents,
  adminSession,
  adminSignOut,
  deleteQuotes,
  listEvents,
  listQuoteRequests,
  updateQuotes,
  type AdminSession,
  type EventRecord,
  type QuotePatch,
  type QuoteRecord,
} from "@/lib/supabase";

type Ctx = {
  session: AdminSession;
  rows: QuoteRecord[];
  events: EventRecord[];
  loading: boolean;
  /** Time of the last data load; use this instead of Date.now() while rendering. */
  now: number;
  error: string;
  reload: () => Promise<void>;
  patch: (ids: string[], p: QuotePatch) => Promise<void>;
  remove: (ids: string[]) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminCtx = createContext<Ctx | null>(null);
export function useAdmin(): Ctx {
  const c = useContext(AdminCtx);
  if (!c) throw new Error("useAdmin must be used inside AdminProvider");
  return c;
}

const nav = [
  { href: "/admin", label: "Overview", icon: "M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" },
  { href: "/admin/requests", label: "Requests", icon: "M4 6h16M4 12h16M4 18h10" },
  { href: "/admin/analytics", label: "Analytics", icon: "M4 20V10m6 10V4m6 16v-7m4 7H2" },
  { href: "/admin/account", label: "Account", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0" },
];

function describe(prev: QuoteRecord, p: QuotePatch): { kind: string; text: string }[] {
  const out: { kind: string; text: string }[] = [];
  if (p.status && p.status !== prev.status) out.push({ kind: "status", text: `Status: ${prev.status} → ${p.status}` });
  if (p.priority && p.priority !== (prev.priority ?? "normal")) out.push({ kind: "priority", text: `Priority: ${prev.priority ?? "normal"} → ${p.priority}` });
  if (p.assigned_to !== undefined && (p.assigned_to ?? "") !== (prev.assigned_to ?? "")) out.push({ kind: "assign", text: p.assigned_to ? `Assigned to ${p.assigned_to}` : "Unassigned" });
  if (p.quote_amount !== undefined && (p.quote_amount ?? null) !== (prev.quote_amount ?? null)) out.push({ kind: "quote", text: p.quote_amount == null ? "Quote amount cleared" : `Quote amount: SAR ${p.quote_amount}` });
  if (p.follow_up_at !== undefined && (p.follow_up_at ?? null) !== (prev.follow_up_at ?? null)) out.push({ kind: "followup", text: p.follow_up_at ? `Follow-up set for ${p.follow_up_at}` : "Follow-up cleared" });
  if (p.internal_notes !== undefined && (p.internal_notes ?? "") !== (prev.internal_notes ?? "")) out.push({ kind: "note", text: p.internal_notes ? `Note: ${p.internal_notes.slice(0, 500)}` : "Note cleared" });
  return out;
}

/** Auth guard, data store and layout (sidebar + top bar) for every /admin page except the login page. */
export default function AdminProvider({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "";
  const router = useRouter();
  const isLogin = path.startsWith("/admin/login");
  const [session, setSession] = useState<AdminSession | null>(null);
  const [rows, setRows] = useState<QuoteRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(0);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const s = await adminSession();
      if (!s) {
        setSession(null);
        router.replace("/admin/login");
        return;
      }
      const [r, e] = await Promise.all([listQuoteRequests(), listEvents().catch(() => [] as EventRecord[])]);
      setSession(s);
      setRows(r);
      setEvents(e);
      setNow(Date.now());
      setError("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load data.";
      if (message.startsWith("Session expired")) router.replace("/admin/login");
      else setError(message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (isLogin) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load after mount
    void load();
    const t = setInterval(() => { if (!document.hidden) void load(); }, 60_000);
    return () => clearInterval(t);
  }, [isLogin, load]);

  const fresh = useMemo(() => rows.filter((r) => r.status === "new").length, [rows]);
  useEffect(() => {
    if (isLogin) return;
    document.title = fresh ? `(${fresh}) Admin | Gulf Elite Transport` : "Admin | Gulf Elite Transport";
  }, [fresh, isLogin]);

  const patch = useCallback(
    async (ids: string[], p: QuotePatch) => {
      const prev = rows;
      const evs = ids.flatMap((id) => {
        const r = prev.find((x) => x.id === id);
        return r ? describe(r, p).map((d) => ({ request_id: id, actor: session?.email ?? "admin", ...d })) : [];
      });
      setRows(prev.map((r) => (ids.includes(r.id) ? { ...r, ...p } : r)));
      try {
        await updateQuotes(ids, p);
        await addEvents(evs).catch(() => {});
        setEvents((cur) => [...evs.map((e, i) => ({ ...e, id: `local-${Date.now()}-${i}`, created_at: new Date().toISOString() })), ...cur]);
      } catch (err) {
        setRows(prev);
        throw err;
      }
    },
    [rows, session],
  );

  const remove = useCallback(
    async (ids: string[]) => {
      await deleteQuotes(ids);
      setRows((cur) => cur.filter((r) => !ids.includes(r.id)));
      setEvents((cur) => cur.filter((e) => !ids.includes(e.request_id)));
    },
    [],
  );

  const signOut = useCallback(async () => {
    await adminSignOut();
    setSession(null);
    setRows([]);
    setEvents([]);
    router.push("/admin/login");
  }, [router]);

  if (isLogin) return <>{children}</>;
  if (!session) {
    return <p className="px-5 py-24 text-center text-muted">{error ? <span role="alert" className="text-red-700">{error}</span> : "Loading..."}</p>;
  }

  const ctx: Ctx = { session, rows, events, loading, now, error, reload: load, patch, remove, signOut };
  return (
    <AdminCtx.Provider value={ctx}>
      <div className="flex min-h-screen flex-col bg-surface lg:flex-row">
        <aside className="bg-navy text-white lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0">
          <div className="flex items-center justify-between px-5 py-4 lg:block lg:py-6">
            <p className="text-lg font-extrabold">Gulf Elite <span className="text-accent">Admin</span></p>
            <p className="hidden truncate text-xs text-white/60 lg:mt-1 lg:block">{session.email}</p>
            <button onClick={signOut} className="rounded-full px-3 py-1 text-xs font-bold ring-1 ring-white/25 lg:hidden">Sign out</button>
          </div>
          <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-0">
            {nav.map((n) => {
              const active = n.href === "/admin" ? path === "/admin" || path === "/admin/" : path.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-accent text-navy" : "text-white/80 hover:bg-white/10"}`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={n.icon} /></svg>
                  {n.label}
                  {n.label === "Requests" && fresh > 0 && <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-navy">{fresh}</span>}
                </Link>
              );
            })}
          </nav>
          <div className="hidden px-3 pt-6 lg:block">
            <button onClick={signOut} className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-white/80 ring-1 ring-white/20 hover:bg-white/10">Sign out</button>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          {error && (
            <p role="alert" className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-800">{error}</p>
          )}
          {children}
        </div>
      </div>
    </AdminCtx.Provider>
  );
}
