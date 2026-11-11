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
export type QuoteRecord = QuoteRequestRow & { id: string; created_at: string; status: QuoteStatus };

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
  if (!res.ok) throw new Error(`Request failed (${res.status}). Have you run supabase/admin.sql?`);
  return res;
}

export async function listQuoteRequests(): Promise<QuoteRecord[]> {
  return (await authed("quote_requests?select=*&order=created_at.desc&limit=1000")).json();
}

export async function setQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  await authed(`quote_requests?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ status }) });
}

export async function deleteQuote(id: string): Promise<void> {
  await authed(`quote_requests?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
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
