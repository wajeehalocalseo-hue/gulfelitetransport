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
