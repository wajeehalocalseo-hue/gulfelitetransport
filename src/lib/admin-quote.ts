import { fmtDate, isRide } from "./admin-stats";
import { site } from "./site";
import type { QuoteRecord } from "./supabase";

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
export const refOf = (r: QuoteRecord) => `GE-${r.id.slice(0, 6).toUpperCase()}`;

/** Opens a printable quotation for a request. Use the browser's Print dialog to save it as a PDF. */
export function printQuote(r: QuoteRecord, terms: string): boolean {
  const w = window.open("", "_blank");
  if (!w) return false;
  const rows: [string, unknown][] = [
    ["Customer", r.name + (r.business ? ` (${r.business})` : "")],
    ["Service", isRide(r) ? "Taxi / cab ride" : r.service],
    ["Pickup", r.pickup],
    ["Drop-off / delivery", r.dropoff],
    ["Date", r.preferred_date],
    ["Details", r.details],
  ];
  const contact = [site.phone, site.email].filter(Boolean).join(" | ");
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Quotation ${esc(refOf(r))}</title>
<style>body{font-family:Arial,Helvetica,sans-serif;color:#101c2c;max-width:720px;margin:40px auto;padding:0 24px}
h1{margin:0;font-size:26px}.bar{height:6px;background:#f5a623;margin:14px 0 24px;border-radius:3px}
table{width:100%;border-collapse:collapse}td{padding:10px 8px;border-bottom:1px solid #e3e8ef;vertical-align:top}
td:first-child{width:170px;font-weight:bold;color:#566377}.total{margin-top:24px;padding:18px;background:#f7f9fc;border-radius:8px;font-size:22px;font-weight:bold;display:flex;justify-content:space-between}
.small{color:#566377;font-size:13px;margin-top:24px;line-height:1.6;white-space:pre-wrap}@media print{button{display:none}}</style></head><body>
<h1>${esc(site.legalName || site.name)}</h1><p style="margin:4px 0 0;color:#566377">Quotation ${esc(refOf(r))} &middot; ${esc(fmtDate(new Date().toISOString()))}</p>${contact ? `<p style="margin:2px 0 0;color:#566377">${esc(contact)}</p>` : ""}
<div class="bar"></div><table>${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>
<div class="total"><span>Total</span><span>${r.quote_amount != null ? `SAR ${esc(Number(r.quote_amount).toLocaleString("en-US"))}` : "To be confirmed"}</span></div>
<p class="small">${esc(terms)}</p><button onclick="window.print()" style="margin-top:20px;padding:10px 20px">Print / Save as PDF</button></body></html>`);
  w.document.close();
  return true;
}
