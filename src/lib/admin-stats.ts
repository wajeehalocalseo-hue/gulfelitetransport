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
