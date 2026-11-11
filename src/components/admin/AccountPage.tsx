"use client";

import { useState } from "react";
import { dayKey, download, toCsv } from "@/lib/admin-stats";
import { changePassword } from "@/lib/supabase";
import { useAdmin } from "./AdminProvider";
import { btn, btnDark, Card, field, PageHead } from "./ui";

export default function AccountPage() {
  const { session, rows, signOut } = useAdmin();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const d = new FormData(form);
    const a = String(d.get("p1") ?? "");
    const b = String(d.get("p2") ?? "");
    if (a.length < 12) return setMsg({ ok: false, text: "Use at least 12 characters." });
    if (a !== b) return setMsg({ ok: false, text: "The two passwords do not match." });
    setBusy(true);
    try {
      await changePassword(a);
      form.reset();
      setMsg({ ok: true, text: "Password changed." });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Could not change the password." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-5 py-8">
      <PageHead title="Account" sub={`Signed in as ${session.email}`} />
      <Card title="Change password">
        <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
          <label className="grid gap-1 text-sm font-semibold text-navy">New password<input name="p1" type="password" autoComplete="new-password" required className={field} /></label>
          <label className="grid gap-1 text-sm font-semibold text-navy">Repeat new password<input name="p2" type="password" autoComplete="new-password" required className={field} /></label>
          <button disabled={busy} className={btnDark}>{busy ? "Saving..." : "Change password"}</button>
          {msg && <p role="status" className={`text-sm ${msg.ok ? "text-green-700" : "text-red-700"}`}>{msg.text}</p>}
        </form>
      </Card>
      <Card title="Backup">
        <p className="mb-3 text-sm text-muted">Download every request (including spam) as a spreadsheet file. It opens in Excel and Google Sheets.</p>
        <button onClick={() => download(`all-requests-${dayKey(Date.now())}.csv`, toCsv(rows))} className={btn}>Download all ({rows.length}) as CSV</button>
      </Card>
      <Card title="Session">
        <button onClick={signOut} className={btn}>Sign out</button>
      </Card>
    </div>
  );
}
