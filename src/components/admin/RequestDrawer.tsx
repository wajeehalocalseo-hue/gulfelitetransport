"use client";

import { useEffect, useMemo, useState } from "react";
import { fill, useAdminSettings } from "@/lib/admin-settings";
import { fmtDate, followUpState, isRide, PRIORITIES, pri, sameCustomer, spamSignals, STATUSES, waNumber } from "@/lib/admin-stats";
import { printQuote, refOf } from "@/lib/admin-quote";
import type { QuoteRecord, QuoteStatus } from "@/lib/supabase";
import { useAdmin } from "./AdminProvider";
import { btn, btnDark, field, Pill, priorityTone, statusTone } from "./ui";

const label = "text-xs font-bold uppercase tracking-wide text-muted";

export default function RequestDrawer({ r, onClose }: { r: QuoteRecord; onClose: () => void }) {
  const { rows, events, patch, remove, openRequest, now } = useAdmin();
  const [settings] = useAdminSettings();
  const [assigned, setAssigned] = useState(r.assigned_to ?? "");
  const [amount, setAmount] = useState(r.quote_amount != null ? String(r.quote_amount) : "");
  const [follow, setFollow] = useState(r.follow_up_at ?? "");
  const [notes, setNotes] = useState(r.internal_notes ?? "");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const mine = useMemo(() => events.filter((e) => e.request_id === r.id), [events, r.id]);
  const earlier = useMemo(() => sameCustomer(rows, r), [rows, r]);
  const spam = spamSignals(r);

  const vars = {
    name: r.name,
    service: isRide(r) ? "ride" : r.service,
    route: r.pickup && r.dropoff ? ` from ${r.pickup} to ${r.dropoff}` : "",
    date: r.preferred_date ? ` on ${r.preferred_date}` : "",
    amount: r.quote_amount != null ? String(r.quote_amount) : "[amount]",
    ref: refOf(r),
  };
  const wa = (text: string) => `https://wa.me/${waNumber(r.phone)}?text=${encodeURIComponent(text)}`;
  const mailBody = fill(settings.emailTemplate, vars);

  const run = async (fn: () => Promise<void>, ok: string) => {
    setBusy(true);
    setMsg("");
    try {
      await fn();
      setMsg(ok);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    const n = amount.trim() === "" ? null : Number(amount);
    if (n !== null && (!Number.isFinite(n) || n < 0)) return setMsg("Quote amount must be a positive number.");
    return run(() => patch([r.id], { assigned_to: assigned.trim() || null, quote_amount: n, follow_up_at: follow || null, internal_notes: notes.trim() || null }), "Saved.");
  };

  const fu = followUpState({ ...r, follow_up_at: follow || null }, now);
  const details: [string, string | null | undefined][] = [
    ["Phone", r.phone],
    ["Email", r.email],
    ["Business", r.business],
    ["Service", r.service],
    ["Topic / page", r.topic],
    ["Pickup", r.pickup],
    ["Drop-off / delivery", r.dropoff],
    ["Preferred date", r.preferred_date],
    ["Extra", r.extra],
    ["Sent from", r.page_path],
    ["Reference", refOf(r)],
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Request from ${r.name}`}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-navy/50" />
      <div className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-navy/10 bg-white px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-extrabold text-navy">{r.name}</h2>
            <p className="text-xs text-muted">Received {fmtDate(r.created_at)}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill className={statusTone[r.status]}>{r.status}</Pill>
              <Pill className={priorityTone[pri(r)]}>{pri(r)}</Pill>
              {fu === "overdue" && <Pill className="bg-red-100 text-red-800">follow-up overdue</Pill>}
              {fu === "today" && <Pill className="bg-amber-100 text-amber-900">follow-up today</Pill>}
              {earlier.length > 0 && <Pill className="bg-violet-100 text-violet-900">repeat customer</Pill>}
            </div>
          </div>
          <button onClick={onClose} className={btn}>Close</button>
        </div>

        <div className="space-y-6 p-5">
          {spam.length > 0 && r.status !== "spam" && (
            <div role="note" className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 p-3 text-sm text-red-800">
              <span>Possible spam: {spam.join(", ")}.</span>
              <button disabled={busy} onClick={() => run(() => patch([r.id], { status: "spam" }), "Marked as spam.")} className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">Mark as spam</button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <a href={`tel:${r.phone}`} className={btnDark}>Call</a>
            <a href={wa(fill(settings.waTemplate, vars))} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">WhatsApp</a>
            {r.quote_amount != null && (
              <a href={wa(fill(settings.quoteWaTemplate, vars))} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-700 px-4 py-2 text-sm font-bold text-white">Send quote on WhatsApp</a>
            )}
            <a href={`mailto:${r.email}?subject=${encodeURIComponent(`Your ${vars.service} request`)}&body=${encodeURIComponent(mailBody)}`} className={btn}>Email</a>
            <button onClick={() => (printQuote(r, settings.quoteTerms) ? undefined : setMsg("Allow pop-ups to open the quotation."))} className={btn}>Print quote</button>
            <button onClick={() => navigator.clipboard?.writeText(`${r.name} | ${r.phone} | ${r.email}\n${r.service}${vars.route}\n${r.details}`).then(() => setMsg("Copied."))} className={btn}>Copy</button>
          </div>

          <div>
            <p className={label}>Status</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={busy}
                  onClick={() => run(() => patch([r.id], { status: s as QuoteStatus }), `Status set to ${s}.`)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-bold capitalize ring-1 transition ${r.status === s ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-navy/20 hover:bg-accent/20"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className={label}>Priority</span>
              <select value={pri(r)} onChange={(e) => run(() => patch([r.id], { priority: e.target.value as never }), "Priority updated.")} className={field}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label className="grid gap-1">
              <span className={label}>Assigned to</span>
              <input value={assigned} onChange={(e) => setAssigned(e.target.value)} placeholder="Team member" maxLength={120} className={field} />
            </label>
            <label className="grid gap-1">
              <span className={label}>Quote amount (SAR)</span>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="0" className={field} />
            </label>
            <label className="grid gap-1">
              <span className={label}>Follow-up date</span>
              <input value={follow} onChange={(e) => setFollow(e.target.value)} type="date" className={field} />
            </label>
            <label className="grid gap-1 sm:col-span-2">
              <span className={label}>Internal notes (never shown to the customer)</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={5000} className={field} />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button disabled={busy} onClick={save} className={btnDark}>{busy ? "Saving..." : "Save changes"}</button>
            {[1, 2, 7].map((d) => (
              <button key={d} type="button" onClick={() => setFollow(new Date(now + d * 86_400_000).toLocaleDateString("en-CA", { timeZone: "Asia/Riyadh" }))} className="text-xs font-bold text-muted underline">
                Follow up in {d === 1 ? "1 day" : `${d} days`}
              </button>
            ))}
            {msg && <p role="status" className="text-sm text-muted">{msg}</p>}
          </div>

          <div>
            <p className={label}>Request</p>
            <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {details.filter(([, v]) => v).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="break-words font-semibold text-navy">{v}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted">Details</dt>
                <dd className="whitespace-pre-wrap break-words text-navy">{r.details}</dd>
              </div>
            </dl>
          </div>

          {earlier.length > 0 && (
            <div>
              <p className={label}>Earlier requests from this customer ({earlier.length})</p>
              <ul className="mt-2 divide-y divide-navy/10 rounded-xl border border-navy/10">
                {earlier.slice(0, 8).map((x) => (
                  <li key={x.id}>
                    <button onClick={() => openRequest(x.id)} className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm">
                      <span className="min-w-0 truncate text-navy">{isRide(x) ? "Ride" : x.service}{x.pickup && x.dropoff ? `: ${x.pickup} → ${x.dropoff}` : ""}</span>
                      <Pill className={statusTone[x.status]}>{x.status}</Pill>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className={label}>Activity</p>
            {mine.length === 0 ? (
              <p className="mt-2 text-sm text-muted">No activity yet.</p>
            ) : (
              <ol className="mt-2 space-y-3 border-l-2 border-accent/60 pl-4">
                {mine.map((e) => (
                  <li key={e.id} className="text-sm">
                    <p className="break-words text-navy">{e.text}</p>
                    <p className="text-xs text-muted">{fmtDate(e.created_at)} · {e.actor}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="border-t border-navy/10 pt-4">
            <button
              disabled={busy}
              onClick={() => window.confirm("Delete this request permanently?") && run(() => remove([r.id]), "Deleted.").then(onClose)}
              className="rounded-full px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50"
            >
              Delete request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
