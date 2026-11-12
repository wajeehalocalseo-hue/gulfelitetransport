"use client";

import { useState } from "react";
import { defaultSettings, useAdminSettings } from "@/lib/admin-settings";
import { dayKey, download, toCsv } from "@/lib/admin-stats";
import { changePassword } from "@/lib/supabase";
import { useAdmin } from "./AdminProvider";
import { btn, btnDark, Card, field, PageHead } from "./ui";

const label = "grid gap-1 text-sm font-semibold text-navy";

export default function SettingsPage() {
  const { session, rows, signOut, theme, setTheme } = useAdmin();
  const [s, update] = useAdminSettings();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState("");

  async function onPassword(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const d = new FormData(form);
    const a = String(d.get("p1") ?? "");
    if (a.length < 12) return setMsg({ ok: false, text: "Use at least 12 characters." });
    if (a !== String(d.get("p2") ?? "")) return setMsg({ ok: false, text: "The two passwords do not match." });
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

  async function setDesktop(on: boolean) {
    if (on && typeof Notification !== "undefined" && Notification.permission !== "granted") {
      const p = await Notification.requestPermission();
      if (p !== "granted") return setSaved("The browser blocked notifications. Allow them in the site settings.");
    }
    update({ desktopNotify: on });
    setSaved("");
  }

  const area = (k: "waTemplate" | "quoteWaTemplate" | "emailTemplate" | "quoteEmailTemplate" | "driverTemplate" | "quoteTerms", title: string, rowsN = 4) => (
    <label className={label}>
      {title}
      <textarea value={s[k]} onChange={(e) => update({ [k]: e.target.value })} rows={rowsN} className={field} />
    </label>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-5 py-8">
      <PageHead title="Settings" sub={`Signed in as ${session.email}. Preferences are saved in this browser.`} />

      <Card title="Appearance and alerts">
        <div className="grid gap-4">
          <label className="flex items-center justify-between gap-4 text-sm font-semibold text-navy">
            Dark mode
            <input type="checkbox" checked={theme === "dark"} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm font-semibold text-navy">
            Play a sound when a new request arrives
            <input type="checkbox" checked={s.sound} onChange={(e) => update({ sound: e.target.checked })} />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm font-semibold text-navy">
            Desktop notification for new requests (while this tab is open)
            <input type="checkbox" checked={s.desktopNotify} onChange={(e) => void setDesktop(e.target.checked)} />
          </label>
          <label className={label}>
            Flag a new request as slow after (hours)
            <input type="number" min={1} max={72} value={s.slaHours} onChange={(e) => update({ slaHours: Math.min(72, Math.max(1, Number(e.target.value) || 1)) })} className={`${field} w-28`} />
          </label>
          {saved && <p role="status" className="text-sm text-red-700">{saved}</p>}
          <p className="text-xs text-muted">The list refreshes every 30 seconds while this tab is open. For alerts when the tab is closed, the email from the Resend function still arrives.</p>
        </div>
      </Card>

      <Card title="Message templates">
        <p className="mb-3 text-xs text-muted">Placeholders: {"{name} {service} {route} {date} {amount} {ref} {driver} {day} {pickup} {dropoff} {phone} {details}"}</p>
        <div className="grid gap-4">
          {area("waTemplate", "WhatsApp: first reply", 3)}
          {area("quoteWaTemplate", "WhatsApp: send the quote", 3)}
          {area("emailTemplate", "Email reply", 6)}
          {area("quoteEmailTemplate", "Email: send the quotation", 7)}
          {area("driverTemplate", "WhatsApp: job message to a driver", 7)}
          {area("quoteTerms", "Text printed at the bottom of a quotation", 3)}
          <button onClick={() => update({ waTemplate: defaultSettings.waTemplate, quoteWaTemplate: defaultSettings.quoteWaTemplate, emailTemplate: defaultSettings.emailTemplate, quoteEmailTemplate: defaultSettings.quoteEmailTemplate, driverTemplate: defaultSettings.driverTemplate, quoteTerms: defaultSettings.quoteTerms })} className={`${btn} w-fit`}>Reset templates</button>
        </div>
      </Card>

      <Card title="Change password">
        <form onSubmit={onPassword} className="grid max-w-sm gap-3">
          <label className={label}>New password<input name="p1" type="password" autoComplete="new-password" required className={field} /></label>
          <label className={label}>Repeat new password<input name="p2" type="password" autoComplete="new-password" required className={field} /></label>
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
