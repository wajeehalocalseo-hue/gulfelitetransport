"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminSettings } from "@/lib/admin-settings";
import { useAdminTheme, type Theme } from "@/lib/admin-theme";
import CommandPalette from "./CommandPalette";
import RequestDrawer from "./RequestDrawer";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  addEvents,
  adminSession,
  createDriver,
  deleteDriver,
  listDrivers,
  updateDriver,
  adminSignOut,
  deleteQuotes,
  listEvents,
  listQuoteRequests,
  updateQuotes,
  type AdminSession,
  type Driver,
  type DriverInput,
  type EventRecord,
  type QuotePatch,
  type QuoteRecord,
} from "@/lib/supabase";

type Ctx = {
  session: AdminSession;
  rows: QuoteRecord[];
  events: EventRecord[];
  drivers: Driver[];
  addDriver: (d: DriverInput) => Promise<void>;
  editDriver: (id: string, d: Partial<DriverInput>) => Promise<void>;
  removeDriver: (id: string) => Promise<void>;
  loading: boolean;
  /** Time of the last data load; use this instead of Date.now() while rendering. */
  now: number;
  error: string;
  reload: () => Promise<void>;
  patch: (ids: string[], p: QuotePatch) => Promise<void>;
  remove: (ids: string[]) => Promise<void>;
  signOut: () => Promise<void>;
  theme: Theme;
  setTheme: (t: Theme) => void;
  openRequest: (id: string | null) => void;
  openPalette: () => void;
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
  { href: "/admin/board", label: "Board", icon: "M4 4h5v16H4zM10 4h5v10h-5zM16 4h4v13h-4z" },
  { href: "/admin/calendar", label: "Calendar", icon: "M7 3v4m10-4v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" },
  { href: "/admin/drivers", label: "Drivers", icon: "M5 17h14M5 17a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0M3 13l2-6h14l2 6v4H3v-4Zm0 0h18" },
  { href: "/admin/customers", label: "Customers", icon: "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-3 0-6 1.5-6 4v2h12v-2c0-2.5-3-4-6-4Zm8 0c-.5 0-1 0-1.500.1 1.700 1 2.500 2.300 2.500 3.900v2h5v-2c0-2.500-3-4-6-4Z" },
  { href: "/admin/activity", label: "Activity", icon: "M3 12h4l3-8 4 16 3-8h4" },
  { href: "/admin/analytics", label: "Analytics", icon: "M4 20V10m6 10V4m6 16v-7m4 7H2" },
  { href: "/admin/settings", label: "Settings", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.400-3a7.400 7.400 0 0 0-.1-1.200l2-1.600-2-3.400-2.400 1a7.500 7.500 0 0 0-2-1.200L14.500 3h-4l-.4 2.600a7.500 7.500 0 0 0-2 1.200l-2.400-1-2 3.400 2 1.600a7.400 7.400 0 0 0 0 2.400l-2 1.600 2 3.400 2.400-1a7.500 7.500 0 0 0 2 1.200l.4 2.600h4l.4-2.600a7.500 7.500 0 0 0 2-1.200l2.400 1 2-3.400-2-1.600c.1-.4.1-.8.1-1.200Z" },
];

function beep() {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.5);
  } catch {
    /* sound is optional */
  }
}

function describe(prev: QuoteRecord, p: QuotePatch, drivers: Driver[]): { kind: string; text: string }[] {
  const out: { kind: string; text: string }[] = [];
  if (p.status && p.status !== prev.status) out.push({ kind: "status", text: `Status: ${prev.status} → ${p.status}` });
  if (p.priority && p.priority !== (prev.priority ?? "normal")) out.push({ kind: "priority", text: `Priority: ${prev.priority ?? "normal"} → ${p.priority}` });
  if (p.assigned_to !== undefined && (p.assigned_to ?? "") !== (prev.assigned_to ?? "")) out.push({ kind: "assign", text: p.assigned_to ? `Assigned to ${p.assigned_to}` : "Unassigned" });
  if (p.quote_amount !== undefined && (p.quote_amount ?? null) !== (prev.quote_amount ?? null)) out.push({ kind: "quote", text: p.quote_amount == null ? "Quote amount cleared" : `Quote amount: SAR ${p.quote_amount}` });
  if (p.follow_up_at !== undefined && (p.follow_up_at ?? null) !== (prev.follow_up_at ?? null)) out.push({ kind: "followup", text: p.follow_up_at ? `Follow-up set for ${p.follow_up_at}` : "Follow-up cleared" });
  if (p.driver_id !== undefined && (p.driver_id ?? null) !== (prev.driver_id ?? null)) {
    const d = drivers.find((x) => x.id === p.driver_id);
    out.push({ kind: "driver", text: d ? `Driver assigned: ${d.name}` : "Driver removed" });
  }
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
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(0);
  const [error, setError] = useState("");
  const [theme, setTheme] = useAdminTheme();
  const [settings] = useAdminSettings();
  const settingsRef = useRef(settings);
  const known = useRef<Set<string> | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [palette, setPalette] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    document.documentElement.classList.toggle("admin-dark", theme === "dark");
    return () => document.documentElement.classList.remove("admin-dark");
  }, [theme]);

  const load = useCallback(async () => {
    try {
      const s = await adminSession();
      if (!s) {
        setSession(null);
        router.replace("/admin/login");
        return;
      }
      const [r, e, dr] = await Promise.all([listQuoteRequests(), listEvents().catch(() => [] as EventRecord[]), listDrivers().catch(() => [] as Driver[])]);
      if (known.current === null) {
        const wanted = new URLSearchParams(window.location.search).get("open");
        if (wanted && r.some((x) => x.id === wanted)) setOpenId(wanted);
      } else {
        const seen = known.current;
        const arrived = r.filter((x) => !seen.has(x.id) && x.status === "new");
        if (arrived.length) {
          setToasts((cur) => [...arrived.map((x) => ({ id: x.id, text: `New request from ${x.name}` })), ...cur].slice(0, 4));
          if (settingsRef.current.sound) beep();
          if (settingsRef.current.desktopNotify && typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("New request", { body: `${arrived[0].name}: ${arrived[0].service}` });
          }
        }
      }
      known.current = new Set(r.map((x) => x.id));
      setSession(s);
      setRows(r);
      setEvents(e);
      setDrivers(dr);
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
    const t = setInterval(() => { if (!document.hidden) void load(); }, 30_000);
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
        return r ? describe(r, p, drivers).map((d) => ({ request_id: id, actor: session?.email ?? "admin", ...d })) : [];
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
    [rows, session, drivers],
  );

  const addDriver = useCallback(async (d: DriverInput) => {
    const created = await createDriver(d);
    setDrivers((cur) => [...cur, created].sort((a, b) => a.name.localeCompare(b.name)));
  }, []);
  const editDriver = useCallback(async (id: string, d: Partial<DriverInput>) => {
    await updateDriver(id, d);
    setDrivers((cur) => cur.map((x) => (x.id === id ? { ...x, ...d } : x)));
  }, []);
  const removeDriver = useCallback(async (id: string) => {
    await deleteDriver(id);
    setDrivers((cur) => cur.filter((x) => x.id !== id));
    setRows((cur) => cur.map((r) => (r.driver_id === id ? { ...r, driver_id: null } : r)));
  }, []);

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

  useEffect(() => {
    if (isLogin) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLogin]);

  useEffect(() => {
    if (!toasts.length) return;
    const t = setTimeout(() => setToasts((cur) => cur.slice(0, -1)), 7000);
    return () => clearTimeout(t);
  }, [toasts]);

  if (isLogin) return <>{children}</>;
  if (!session) {
    return <p className="px-5 py-24 text-center text-muted">{error ? <span role="alert" className="text-red-700">{error}</span> : "Loading..."}</p>;
  }

  const ctx: Ctx = { session, rows, events, drivers, addDriver, editDriver, removeDriver, loading, now, error, reload: load, patch, remove, signOut, theme, setTheme, openRequest: setOpenId, openPalette: () => setPalette(true) };
  const openRow = openId ? rows.find((r) => r.id === openId) : undefined;
  return (
    <AdminCtx.Provider value={ctx}>
      <div className="flex min-h-screen flex-col bg-surface lg:flex-row">
        <aside className="bg-navy text-white lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0">
          <div className="flex items-center justify-between px-5 py-4 lg:block lg:py-6">
            <p className="text-lg font-extrabold">Gulf Elite <span className="text-accent">Admin</span></p>
            <p className="hidden truncate text-xs text-white/60 lg:mt-1 lg:block">{session.email}</p>
            <div className="flex gap-2 lg:hidden">
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-full px-3 py-1 text-xs font-bold ring-1 ring-white/25">{theme === "dark" ? "Light" : "Dark"}</button>
              <button onClick={signOut} className="rounded-full px-3 py-1 text-xs font-bold ring-1 ring-white/25">Sign out</button>
            </div>
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
            <button onClick={() => setPalette(true)} className="mb-2 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-white/80 ring-1 ring-white/20 hover:bg-white/10">
              Search <kbd className="rounded bg-white/15 px-1.5 text-xs">Ctrl K</kbd>
            </button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-pressed={theme === "dark"} className="mb-2 w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-white/80 ring-1 ring-white/20 hover:bg-white/10">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
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
      {openRow && <RequestDrawer key={openRow.id} r={openRow} onClose={() => setOpenId(null)} />}
      {palette && <CommandPalette onClose={() => setPalette(false)} />}
      <div aria-live="polite" className="fixed right-4 top-4 z-[60] grid gap-2">
        {toasts.map((t) => (
          <button
            key={t.id}
            onClick={() => { setOpenId(t.id); setToasts((cur) => cur.filter((x) => x.id !== t.id)); }}
            className="rounded-xl bg-accent px-4 py-3 text-left text-sm font-extrabold text-navy shadow-2xl"
          >
            {t.text} <span className="font-normal">- click to open</span>
          </button>
        ))}
      </div>
    </AdminCtx.Provider>
  );
}
