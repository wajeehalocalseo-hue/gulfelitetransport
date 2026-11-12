/**
 * Minimal Supabase client for the static site. It talks to the PostgREST API with the public
 * anon key, which is safe to ship in the browser because row-level security only allows INSERT
 * into quote_requests (see supabase/schema.sql). Never put the service-role key here.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "") ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = Boolean(url && anonKey);

export type QuoteRequestRow = {
  name: string;
  business?: string;
  phone: string;
  email: string;
  service: string;
  topic?: string;
  pickup?: string;
  dropoff?: string;
  preferred_date?: string;
  details: string;
  extra?: string;
  page_path?: string;
};

/* ------------------------------------------------------------ admin (Supabase Auth) */
export type AdminSession = { access: string; refresh: string; exp: number; email: string };
export type QuoteStatus = "new" | "contacted" | "quoted" | "won" | "lost" | "spam";
export type Priority = "low" | "normal" | "high" | "urgent";
export type QuoteRecord = QuoteRequestRow & {
  id: string;
  created_at: string;
  updated_at?: string;
  status: QuoteStatus;
  priority?: Priority;
  assigned_to?: string | null;
  quote_amount?: number | null;
  follow_up_at?: string | null;
  internal_notes?: string | null;
  driver_id?: string | null;
};
export type QuotePatch = Partial<Pick<QuoteRecord, "status" | "priority" | "assigned_to" | "quote_amount" | "follow_up_at" | "internal_notes" | "driver_id">>;
export type DriverStatus = "available" | "busy" | "off";
export type Driver = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  city?: string | null;
  vehicle_type?: string | null;
  vehicle_model?: string | null;
  plate?: string | null;
  languages?: string | null;
  status: DriverStatus;
  active: boolean;
  notes?: string | null;
};
export type DriverInput = Omit<Driver, "id" | "created_at">;
export type EventRecord = { id: string; request_id: string; created_at: string; actor: string; kind: string; text: string };

const KEY = "ge_admin_session";
const baseHeaders = { apikey: anonKey, "Content-Type": "application/json" };

function store(s: AdminSession | null) {
  if (s) localStorage.setItem(KEY, JSON.stringify(s));
  else localStorage.removeItem(KEY);
}

function toSession(d: { access_token: string; refresh_token: string; expires_in: number; user?: { email?: string } }, fallbackEmail = ""): AdminSession {
  return { access: d.access_token, refresh: d.refresh_token, exp: Date.now() + d.expires_in * 1000, email: d.user?.email ?? fallbackEmail };
}

export async function adminSignIn(email: string, password: string): Promise<AdminSession> {
  if (!supabaseConfigured) throw new Error("Supabase is not configured");
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: "POST", headers: baseHeaders, body: JSON.stringify({ email, password }) });
  if (!res.ok) throw new Error("Wrong email or password.");
  const s = toSession(await res.json(), email);
  store(s);
  return s;
}

/** Returns a valid session (refreshing it if needed) or null. */
export async function adminSession(): Promise<AdminSession | null> {
  let s: AdminSession | null = null;
  try {
    s = JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    s = null;
  }
  if (!s) return null;
  if (s.exp - 60_000 > Date.now()) return s;
  const res = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: baseHeaders, body: JSON.stringify({ refresh_token: s.refresh }) });
  if (!res.ok) {
    store(null);
    return null;
  }
  const next = toSession(await res.json(), s.email);
  store(next);
  return next;
}

export async function adminSignOut(): Promise<void> {
  const s = await adminSession().catch(() => null);
  store(null);
  if (s) await fetch(`${url}/auth/v1/logout`, { method: "POST", headers: { ...baseHeaders, Authorization: `Bearer ${s.access}` } }).catch(() => {});
}

async function authed(path: string, init: RequestInit = {}): Promise<Response> {
  const s = await adminSession();
  if (!s) throw new Error("Session expired. Please sign in again.");
  const res = await fetch(`${url}/rest/v1/${path}`, { ...init, headers: { ...baseHeaders, Authorization: `Bearer ${s.access}`, ...(init.headers ?? {}) } });
  if (res.status === 401) {
    store(null);
    throw new Error("Session expired. Please sign in again.");
  }
  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 160);
    throw new Error(`Request failed (${res.status}). Run supabase/admin.sql and supabase/admin-advanced.sql in the Supabase SQL Editor. ${detail}`);
  }
  return res;
}

export async function listQuoteRequests(): Promise<QuoteRecord[]> {
  return (await authed("quote_requests?select=*&order=created_at.desc&limit=5000")).json();
}

const NO_BODY = { Prefer: "return=minimal" };
const idList = (ids: string[]) => `in.(${ids.map(encodeURIComponent).join(",")})`;

export async function updateQuotes(ids: string[], patch: QuotePatch): Promise<void> {
  if (!ids.length) return;
  await authed(`quote_requests?id=${idList(ids)}`, { method: "PATCH", headers: NO_BODY, body: JSON.stringify(patch) });
}

export async function deleteQuotes(ids: string[]): Promise<void> {
  if (!ids.length) return;
  await authed(`quote_requests?id=${idList(ids)}`, { method: "DELETE", headers: NO_BODY });
}

export async function listEvents(): Promise<EventRecord[]> {
  return (await authed("request_events?select=*&order=created_at.desc&limit=5000")).json();
}

export async function addEvents(events: Omit<EventRecord, "id" | "created_at">[]): Promise<void> {
  if (!events.length) return;
  await authed("request_events", { method: "POST", headers: NO_BODY, body: JSON.stringify(events) });
}

export async function listDrivers(): Promise<Driver[]> {
  return (await authed("drivers?select=*&order=name.asc&limit=1000")).json();
}

export async function createDriver(d: DriverInput): Promise<Driver> {
  const res = await authed("drivers", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(d) });
  return (await res.json())[0];
}

export async function updateDriver(id: string, d: Partial<DriverInput>): Promise<void> {
  await authed(`drivers?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: NO_BODY, body: JSON.stringify(d) });
}

export async function deleteDriver(id: string): Promise<void> {
  await authed(`drivers?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: NO_BODY });
}

export async function changePassword(password: string): Promise<void> {
  const s = await adminSession();
  if (!s) throw new Error("Session expired. Please sign in again.");
  const res = await fetch(`${url}/auth/v1/user`, { method: "PUT", headers: { ...baseHeaders, Authorization: `Bearer ${s.access}` }, body: JSON.stringify({ password }) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).msg ?? "Could not change the password.");
}
export async function saveQuoteRequest(row: QuoteRequestRow): Promise<void> {
  if (!supabaseConfigured) throw new Error("Supabase is not configured");
  const body = Object.fromEntries(Object.entries(row).filter(([, v]) => v !== undefined && v !== ""));
  const res = await fetch(`${url}/rest/v1/quote_requests`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Supabase insert failed (${res.status})`);
}
