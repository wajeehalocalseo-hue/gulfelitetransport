"use client";

import { useMemo, useState } from "react";
import { ago, fmtDate } from "@/lib/admin-stats";
import { useAdmin } from "./AdminProvider";
import { PageHead, field } from "./ui";

const KINDS = ["", "status", "priority", "assign", "quote", "followup", "note"];

/** Every change made to requests, newest first. */
export default function ActivityPage() {
  const { rows, events, openRequest, now } = useAdmin();
  const [kind, setKind] = useState("");
  const names = useMemo(() => new Map(rows.map((r) => [r.id, r.name])), [rows]);
  const shown = useMemo(() => events.filter((e) => !kind || e.kind === kind).slice(0, 300), [events, kind]);

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-5 py-8">
      <PageHead title="Activity" sub="Status changes, notes, assignments and quotes (last 300).">
        <select value={kind} onChange={(e) => setKind(e.target.value)} className={field} aria-label="Type">
          {KINDS.map((k) => <option key={k} value={k}>{k === "" ? "All activity" : k}</option>)}
        </select>
      </PageHead>
      <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
        {shown.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No activity yet. Changes you make to requests appear here.</p>
        ) : (
          <ol className="space-y-4 border-l-2 border-accent/60 pl-5">
            {shown.map((e) => (
              <li key={e.id} className="text-sm">
                <button onClick={() => openRequest(e.request_id)} className="text-left">
                  <span className="font-extrabold text-navy">{names.get(e.request_id) ?? "Deleted request"}</span>
                  <span className="text-muted"> · {e.text}</span>
                </button>
                <p className="text-xs text-muted" title={fmtDate(e.created_at)}>{ago(e.created_at, now)} · {e.actor}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
