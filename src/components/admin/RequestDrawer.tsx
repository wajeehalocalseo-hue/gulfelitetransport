"use client";

import { useEffect, useState } from "react";
import { fmtDate, followUpState, isRide, PRIORITIES, pri, STATUSES, waNumber } from "@/lib/admin-stats";
import type { EventRecord, QuotePatch, QuoteRecord, QuoteStatus } from "@/lib/supabase";
import { btn, btnDark, field, Pill, priorityTone, statusTone } from "./ui";

type Props = {
  r: QuoteRecord;
  events: EventRecord[];
  onClose: () => void;
  onPatch: (p: QuotePatch) => Promise<void>;
  onDelete: () => Promise<void>;
};

const label = "text-xs font-bold uppercase tracking-wide text-muted";

export default function RequestDrawer({ r, events, onClose, onPatch, onDelete }: Props) {
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

  const route = r.pickup && r.dropoff ? ` from ${r.pickup} to ${r.dropoff}` : "";
  const when = r.preferred_date ? ` on ${r.preferred_date}` : "";
  const hello = `Hello ${r.name}, this is Gulf Elite Transport Group about your ${isRide(r) ? "ride" : r.service} request${route}${when}. `;
  const waText = `${hello}Could you confirm the details so we can send you the price and arrange it?`;
  const mailBody = `Hello ${r.name},\n\nThank you for contacting Gulf Elite Transport Group about your ${isRide(r) ? "ride" : r.service} request${route}${when}.\n\n[Add the quote or your questions here]\n\nKind regards,\nGulf Elite Transport Group`;

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
    return run(
      () => onPatch({ assigned_to: assigned.trim() || null, quote_amount: n, follow_up_at: follow || null, internal_notes: notes.trim() || null }),
      "Saved.",
    );
  };

  const fu = followUpState({ ...r, follow_up_at: follow || null });
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
            </div>
          </div>
          <button onClick={onClose} className={btn}>Close</button>
        </div>

        <div className="space-y-6 p-5">
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${r.phone}`} className={btnDark}>Call</a>
            <a href={`https://wa.me/${waNumber(r.phone)}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">WhatsApp</a>
            <a href={`mailto:${r.email}?subject=${encodeURIComponent(`Your ${isRide(r) ? "ride" : r.service} request`)}&body=${encodeURIComponent(mailBody)}`} className={btn}>Email</a>
            <button onClick={() => navigator.clipboard?.writeText(`${r.name} | ${r.phone} | ${r.email}\n${r.service}${route}\n${r.details}`).then(() => setMsg("Copied."))} className={btn}>Copy</button>
          </div>

          <div>
            <p className={label}>Status</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={busy}
                  onClick={() => run(() => onPatch({ status: s as QuoteStatus }), `Status set to ${s}.`)}
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
              <select value={pri(r)} onChange={(e) => run(() => onPatch({ priority: e.target.value as never }), "Priority updated.")} className={field}>
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

          <div>
            <p className={label}>Activity</p>
            {events.length === 0 ? (
              <p className="mt-2 text-sm text-muted">No activity yet.</p>
            ) : (
              <ol className="mt-2 space-y-3 border-l-2 border-accent/60 pl-4">
                {events.map((e) => (
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
              onClick={() => window.confirm("Delete this request permanently?") && run(onDelete, "Deleted.").then(onClose)}
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
