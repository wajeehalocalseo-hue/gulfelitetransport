import type { EventRecord, Priority, QuoteRecord, QuoteStatus } from "./supabase";

export const TZ = "Asia/Riyadh";
export const STATUSES: QuoteStatus[] = ["new", "contacted", "quoted", "won", "lost", "spam"];
export const PRIORITIES: Priority[] = ["low", "normal", "high", "urgent"];
export const priorityRank: Record<Priority, number> = { low: 0, normal: 1, high: 2, urgent: 3 };
export const RIDE = "Taxi & Cab Services";

export const isRide = (r: QuoteRecord) => r.service === RIDE;
export const pri = (r: QuoteRecord): Priority => r.priority ?? "normal";
const DAY = 86_400_000;

/** YYYY-MM-DD in Saudi time. */
export const dayKey = (d: Date | string | number) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ });
export const hourOf = (d: string) => Number(new Date(d).toLocaleString("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false })) % 24;
export const weekdayOf = (d: string) => new Date(d).toLocaleDateString("en-GB", { timeZone: TZ, weekday: "short" });
export const fmtDate = (iso: string) => new Date(iso).toLocaleString("en-GB", { timeZone: TZ, dateStyle: "medium", timeStyle: "short" });
export const money = (n: number) => `SAR ${Math.round(n).toLocaleString("en-US")}`;

export function ago(iso: string, now = Date.now()): string {
  const m = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} h ago`;
  return `${Math.round(h / 24)} days ago`;
}

const pretty = (slug: string) => slug.replace(/-region$/, "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

/** City (or region) a request came from, read from the Saudi taxi page URL it was sent on. */
export function placeOf(r: QuoteRecord): string {
  const seg = (r.page_path ?? "").split("/").filter(Boolean);
  if (seg[0] === "riyadh-taxi-service") return "Riyadh";
  if (seg[0] === "taxi-saudi-arabia") {
    if (seg[2]) return pretty(seg[2]);
    if (seg[1]) return pretty(seg[1]);
    return "Saudi Arabia hub";
  }
  return "";
}

export function pageOf(r: QuoteRecord): string {
  return r.page_path && r.page_path.length > 1 ? r.page_path.replace(/\/$/, "") : "/";
}

export type Count = { label: string; value: number };
export function tally(rows: QuoteRecord[], key: (r: QuoteRecord) => string, limit = 8): Count[] {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = key(r);
    if (k) m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, limit);
}

/** Requests per day for the last `days` days (oldest first), counted in Saudi time. */
export function perDay(rows: QuoteRecord[], days: number, now = Date.now()): Count[] {
  const counts = new Map<string, number>();
  for (const r of rows) counts.set(dayKey(r.created_at), (counts.get(dayKey(r.created_at)) ?? 0) + 1);
  const out: Count[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const k = dayKey(now - i * DAY);
    out.push({ label: k, value: counts.get(k) ?? 0 });
  }
  return out;
}

export function perWeek(rows: QuoteRecord[], weeks: number, now = Date.now()): Count[] {
  const out: Count[] = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const to = now - i * 7 * DAY;
    const from = to - 7 * DAY;
    out.push({ label: dayKey(from + DAY), value: rows.filter((r) => { const t = new Date(r.created_at).getTime(); return t > from && t <= to; }).length });
  }
  return out;
}

export function perHour(rows: QuoteRecord[]): Count[] {
  const c = Array.from({ length: 24 }, (_, h) => ({ label: String(h).padStart(2, "0"), value: 0 }));
  for (const r of rows) c[hourOf(r.created_at)].value++;
  return c;
}

export function perWeekday(rows: QuoteRecord[]): Count[] {
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const c = order.map((label) => ({ label, value: 0 }));
  for (const r of rows) {
    const i = order.indexOf(weekdayOf(r.created_at));
    if (i >= 0) c[i].value++;
  }
  return c;
}

export function kpis(rows: QuoteRecord[], now = Date.now()) {
  const within = (from: number, to: number) => rows.filter((r) => { const t = new Date(r.created_at).getTime(); return t > from && t <= to; }).length;
  const today = rows.filter((r) => dayKey(r.created_at) === dayKey(now)).length;
  const last7 = within(now - 7 * DAY, now);
  const prev7 = within(now - 14 * DAY, now - 7 * DAY);
  const real = rows.filter((r) => r.status !== "spam");
  const won = real.filter((r) => r.status === "won");
  const lost = real.filter((r) => r.status === "lost");
  const sum = (xs: QuoteRecord[]) => xs.reduce((a, r) => a + (Number(r.quote_amount) || 0), 0);
  const fresh = real.filter((r) => r.status === "new");
  return {
    total: real.length,
    today,
    last7,
    prev7,
    trend: prev7 === 0 ? (last7 > 0 ? 100 : 0) : Math.round(((last7 - prev7) / prev7) * 100),
    open: real.filter((r) => ["new", "contacted", "quoted"].includes(r.status)).length,
    fresh: fresh.length,
    stale: fresh.filter((r) => now - new Date(r.created_at).getTime() > DAY).length,
    winRate: won.length + lost.length ? Math.round((won.length / (won.length + lost.length)) * 100) : null,
    won: won.length,
    pipeline: sum(real.filter((r) => r.status === "quoted")),
    wonValue: sum(won),
    spam: rows.length - real.length,
  };
}

export const followUpState = (r: QuoteRecord, now = Date.now()): "overdue" | "today" | "upcoming" | null => {
  if (!r.follow_up_at || ["won", "lost", "spam"].includes(r.status)) return null;
  const k = dayKey(now);
  return r.follow_up_at < k ? "overdue" : r.follow_up_at === k ? "today" : "upcoming";
};

/** Average hours from the request arriving to the first status change away from "new". */
export function avgFirstResponseHours(rows: QuoteRecord[], events: EventRecord[]): number | null {
  const created = new Map(rows.map((r) => [r.id, new Date(r.created_at).getTime()]));
  const first = new Map<string, number>();
  for (const e of events) {
    if (e.kind !== "status") continue;
    const t = new Date(e.created_at).getTime();
    if (!first.has(e.request_id) || t < first.get(e.request_id)!) first.set(e.request_id, t);
  }
  const gaps = [...first].map(([id, t]) => (created.has(id) ? (t - created.get(id)!) / 3_600_000 : NaN)).filter((x) => x >= 0);
  return gaps.length ? gaps.reduce((a, b) => a + b, 0) / gaps.length : null;
}

const csvCell = (v: unknown) => {
  const s = v == null ? "" : String(v);
  return /^[=+\-@]/.test(s) ? `"'${s.replace(/"/g, '""')}"` : /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(rows: QuoteRecord[]): string {
  const head = ["Received (Riyadh time)", "Status", "Priority", "Name", "Business", "Phone", "Email", "Service", "Topic", "Pickup", "Drop-off", "Preferred date", "Details", "Extra", "Assigned to", "Quote (SAR)", "Follow-up", "Notes", "Page"];
  const lines = rows.map((r) =>
    [fmtDate(r.created_at), r.status, pri(r), r.name, r.business, r.phone, r.email, r.service, r.topic, r.pickup, r.dropoff, r.preferred_date, r.details, r.extra, r.assigned_to, r.quote_amount, r.follow_up_at, r.internal_notes, r.page_path].map(csvCell).join(","),
  );
  return "﻿" + [head.join(","), ...lines].join("\r\n");
}

export function download(name: string, text: string, type = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export const digits = (p: string) => p.replace(/[^\d]/g, "");
/** Saudi-friendly WhatsApp number: 05xxxxxxxx becomes 9665xxxxxxxx. */
export function waNumber(p: string) {
  const d = digits(p);
  if (d.startsWith("00")) return d.slice(2);
  if (d.startsWith("0") && d.length === 10) return `966${d.slice(1)}`;
  return d;
}

/* ------------------------------------------------------------------ customers */
/** Same person across requests: matched by the last 9 digits of the phone, else by email. */
export const customerKey = (r: QuoteRecord): string => {
  const d = digits(r.phone);
  return d.length >= 7 ? `p${d.slice(-9)}` : `e${r.email.toLowerCase()}`;
};
const emailKey = (r: QuoteRecord) => `e${r.email.toLowerCase()}`;

export type Customer = {
  key: string;
  name: string;
  phone: string;
  email: string;
  requests: QuoteRecord[];
  won: number;
  wonValue: number;
  first: string;
  last: string;
};

export function groupCustomers(rows: QuoteRecord[]): Customer[] {
  const m = new Map<string, QuoteRecord[]>();
  for (const r of rows) {
    if (r.status === "spam") continue;
    const k = customerKey(r);
    m.set(k, [...(m.get(k) ?? []), r]);
  }
  return [...m.entries()].map(([key, list]) => {
    const sorted = [...list].sort((a, b) => b.created_at.localeCompare(a.created_at));
    const won = sorted.filter((r) => r.status === "won");
    return {
      key,
      name: sorted[0].name,
      phone: sorted[0].phone,
      email: sorted[0].email,
      requests: sorted,
      won: won.length,
      wonValue: won.reduce((a, r) => a + (Number(r.quote_amount) || 0), 0),
      first: sorted[sorted.length - 1].created_at,
      last: sorted[0].created_at,
    };
  });
}

/** Other requests from the same person (by phone or email). */
export const sameCustomer = (rows: QuoteRecord[], r: QuoteRecord) =>
  rows.filter((x) => x.id !== r.id && (customerKey(x) === customerKey(r) || emailKey(x) === emailKey(r)));

/* ------------------------------------------------------------------ spam hints */
export function spamSignals(r: QuoteRecord): string[] {
  const text = [r.details, r.extra, r.pickup, r.dropoff, r.name].filter(Boolean).join(" ");
  const out: string[] = [];
  if (/https?:\/\/|www\./i.test(text)) out.push("contains a link");
  if (/\b(seo|backlinks?|crypto|bitcoin|casino|viagra|forex|loan|guest post|rank your)\b/i.test(text)) out.push("sales / spam wording");
  if (/(.)\1{5,}/.test(text)) out.push("repeated characters");
  if (/^\d+$/.test(r.name.trim())) out.push("name is only numbers");
  if (digits(r.phone).length > 15 || new Set(digits(r.phone)).size <= 2) out.push("unlikely phone number");
  return out;
}

/* ------------------------------------------------------------------ calendar */
export type CalItem = { id: string; day: string; kind: "pickup" | "followup"; r: QuoteRecord };
export function calendarItems(rows: QuoteRecord[]): CalItem[] {
  const out: CalItem[] = [];
  for (const r of rows) {
    if (r.status === "spam") continue;
    if (r.preferred_date && r.status !== "lost") out.push({ id: `${r.id}-p`, day: r.preferred_date, kind: "pickup", r });
    if (r.follow_up_at && !["won", "lost"].includes(r.status)) out.push({ id: `${r.id}-f`, day: r.follow_up_at, kind: "followup", r });
  }
  return out;
}

/** Weekday (Mon=0) by hour matrix for a heat map. */
export function heatmap(rows: QuoteRecord[]): number[][] {
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const m = order.map(() => Array.from({ length: 24 }, () => 0));
  for (const r of rows) {
    const d = order.indexOf(weekdayOf(r.created_at));
    if (d >= 0) m[d][hourOf(r.created_at)]++;
  }
  return m;
}
