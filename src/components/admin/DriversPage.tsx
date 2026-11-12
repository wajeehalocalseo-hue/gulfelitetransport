"use client";

import { useMemo, useState } from "react";
import { dayKey, isRide, waNumber } from "@/lib/admin-stats";
import type { Driver, DriverInput, DriverStatus } from "@/lib/supabase";
import { useAdmin } from "./AdminProvider";
import { btn, btnDark, Card, field, PageHead, Pill } from "./ui";

const VEHICLES = ["Sedan", "SUV", "Family van", "Minibus", "Luxury", "Other"];
const STATUS_TONE: Record<DriverStatus, string> = {
  available: "bg-green-100 text-green-900",
  busy: "bg-amber-100 text-amber-900",
  off: "bg-slate-200 text-slate-700",
};
const empty: DriverInput = { name: "", phone: "", city: "", vehicle_type: "Sedan", vehicle_model: "", plate: "", languages: "", status: "available", active: true, notes: "" };
const lbl = "grid gap-1 text-xs font-bold uppercase tracking-wide text-muted";

export default function DriversPage() {
  const { drivers, rows, addDriver, editDriver, removeDriver, openRequest, now } = useAdmin();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | DriverStatus | "inactive">("all");
  const [form, setForm] = useState<{ id: string | null; data: DriverInput } | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const today = dayKey(now);

  const stats = useMemo(() => {
    const m = new Map<string, { today: number; upcoming: number; total: number; done: number }>();
    for (const r of rows) {
      if (!r.driver_id || r.status === "spam") continue;
      const s = m.get(r.driver_id) ?? { today: 0, upcoming: 0, total: 0, done: 0 };
      s.total++;
      if (r.status === "won") s.done++;
      if (r.preferred_date === today && !["lost"].includes(r.status)) s.today++;
      else if (r.preferred_date && r.preferred_date > today && r.status !== "lost") s.upcoming++;
      m.set(r.driver_id, s);
    }
    return m;
  }, [rows, today]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return drivers.filter(
      (d) =>
        (filter === "all" ? d.active : filter === "inactive" ? !d.active : d.active && d.status === filter) &&
        (!needle || [d.name, d.phone, d.plate, d.vehicle_model, d.city].some((v) => v?.toLowerCase().includes(needle))),
    );
  }, [drivers, q, filter]);

  const set = <K extends keyof DriverInput>(k: K, v: DriverInput[K]) => setForm((f) => (f ? { ...f, data: { ...f.data, [k]: v } } : f));

  async function save() {
    if (!form) return;
    const d = form.data;
    if (d.name.trim().length < 2) return setMsg("Please enter the driver's name.");
    if (d.phone.trim().length < 7) return setMsg("Please enter a valid phone number.");
    setBusy(true);
    setMsg("");
    const clean: DriverInput = { ...d, name: d.name.trim(), phone: d.phone.trim(), city: d.city?.trim() || null, vehicle_model: d.vehicle_model?.trim() || null, plate: d.plate?.trim() || null, languages: d.languages?.trim() || null, notes: d.notes?.trim() || null };
    try {
      if (form.id) await editDriver(form.id, clean);
      else await addDriver(clean);
      setForm(null);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function del(d: Driver) {
    if (!window.confirm(`Delete ${d.name}? Their past rides stay, but lose the driver link.`)) return;
    try {
      await removeDriver(d.id);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not delete.");
    }
  }

  function dayPlan(d: Driver) {
    const jobs = rows
      .filter((r) => r.driver_id === d.id && r.preferred_date && r.preferred_date >= today && !["lost", "spam"].includes(r.status))
      .sort((a, b) => (a.preferred_date ?? "").localeCompare(b.preferred_date ?? ""))
      .slice(0, 8);
    const text = jobs.length
      ? `Hello ${d.name}, your upcoming rides:\n\n` + jobs.map((r, i) => `${i + 1}. ${r.preferred_date} - ${r.name} (${r.phone})\n   ${r.pickup ?? "-"} -> ${r.dropoff ?? "-"}${isRide(r) ? "" : ` (${r.service})`}`).join("\n")
      : `Hello ${d.name}, you have no rides assigned right now.`;
    window.open(`https://wa.me/${waNumber(d.phone)}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-5 py-8">
      <PageHead title="Drivers" sub={`${drivers.filter((d) => d.active).length} active · assign a driver to any ride from the request panel.`}>
        <button onClick={() => { setMsg(""); setForm({ id: null, data: empty }); }} className={btnDark}>Add driver</button>
      </PageHead>

      <div className="flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search name, phone, plate, city..." className={`${field} w-full sm:w-80`} />
        {(["all", "available", "busy", "off", "inactive"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ring-1 ${filter === s ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-navy/15 hover:bg-accent/20"}`}>{s}</button>
        ))}
      </div>
      {msg && !form && <p role="alert" className="text-sm text-red-700">{msg}</p>}

      {drivers.length === 0 ? (
        <Card><p className="text-sm text-muted">No drivers yet. Click &quot;Add driver&quot;. If adding fails, run <code>supabase/drivers.sql</code> in the Supabase SQL Editor first.</p></Card>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((d) => {
            const s = stats.get(d.id) ?? { today: 0, upcoming: 0, total: 0, done: 0 };
            return (
              <li key={d.id} className={`rounded-2xl border border-navy/10 bg-white p-5 shadow-sm ${d.active ? "" : "opacity-60"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-extrabold text-navy">{d.name}</h2>
                    <p className="truncate text-sm text-muted">{[d.vehicle_type, d.vehicle_model].filter(Boolean).join(" · ") || "Vehicle not set"}{d.plate ? ` · ${d.plate}` : ""}</p>
                  </div>
                  <select
                    aria-label={`Status of ${d.name}`}
                    value={d.status}
                    onChange={(e) => void editDriver(d.id, { status: e.target.value as DriverStatus }).catch((er) => setMsg(er instanceof Error ? er.message : "Could not update."))}
                    className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${STATUS_TONE[d.status]}`}
                  >
                    <option value="available">available</option>
                    <option value="busy">busy</option>
                    <option value="off">off</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-navy">{d.phone}{d.city ? ` · ${d.city}` : ""}</p>
                {d.languages && <p className="text-xs text-muted">Speaks: {d.languages}</p>}
                <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
                  {([["Today", s.today], ["Upcoming", s.upcoming], ["Assigned", s.total], ["Won", s.done]] as const).map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-surface py-2">
                      <dd className="text-lg font-extrabold text-navy">{v}</dd>
                      <dt className="text-[10px] font-bold uppercase text-muted">{k}</dt>
                    </div>
                  ))}
                </dl>
                {d.notes && <p className="mt-3 text-xs text-muted">{d.notes}</p>}
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <a href={`tel:${d.phone}`} className="rounded-full bg-navy px-3.5 py-1.5 font-bold text-white">Call</a>
                  <a href={`https://wa.me/${waNumber(d.phone)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-3.5 py-1.5 font-bold text-white">WhatsApp</a>
                  <button onClick={() => dayPlan(d)} className={`${btn} py-1.5`}>Send ride list</button>
                  <button onClick={() => { setMsg(""); setForm({ id: d.id, data: { ...empty, ...d } }); }} className={`${btn} py-1.5`}>Edit</button>
                </div>
                {s.total > 0 && (
                  <ul className="mt-4 divide-y divide-navy/10 border-t border-navy/10 text-sm">
                    {rows.filter((r) => r.driver_id === d.id && r.status !== "spam" && (!r.preferred_date || r.preferred_date >= today) && r.status !== "lost").slice(0, 3).map((r) => (
                      <li key={r.id}>
                        <button onClick={() => openRequest(r.id)} className="flex w-full justify-between gap-3 py-2 text-left">
                          <span className="min-w-0 truncate text-navy">{r.name}{r.pickup && r.dropoff ? `: ${r.pickup} → ${r.dropoff}` : ""}</span>
                          <Pill className="bg-slate-100 text-slate-700">{r.preferred_date ?? "no date"}</Pill>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          {list.length === 0 && <li className="text-sm text-muted">No drivers match.</li>}
        </ul>
      )}

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Driver">
          <button aria-label="Close" onClick={() => setForm(null)} className="absolute inset-0 bg-navy/60" />
          <div className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-extrabold text-navy">{form.id ? "Edit driver" : "Add driver"}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className={`${lbl} sm:col-span-2`}>Full name<input value={form.data.name} onChange={(e) => set("name", e.target.value)} className={field} maxLength={120} /></label>
              <label className={lbl}>Phone / WhatsApp<input value={form.data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+966..." className={field} /></label>
              <label className={lbl}>City<input value={form.data.city ?? ""} onChange={(e) => set("city", e.target.value)} className={field} /></label>
              <label className={lbl}>Vehicle type
                <select value={form.data.vehicle_type ?? "Sedan"} onChange={(e) => set("vehicle_type", e.target.value)} className={field}>{VEHICLES.map((v) => <option key={v}>{v}</option>)}</select>
              </label>
              <label className={lbl}>Vehicle model<input value={form.data.vehicle_model ?? ""} onChange={(e) => set("vehicle_model", e.target.value)} placeholder="e.g. Toyota Camry 2022" className={field} /></label>
              <label className={lbl}>Plate number<input value={form.data.plate ?? ""} onChange={(e) => set("plate", e.target.value)} className={field} /></label>
              <label className={lbl}>Languages<input value={form.data.languages ?? ""} onChange={(e) => set("languages", e.target.value)} placeholder="Arabic, English, Urdu" className={field} /></label>
              <label className={lbl}>Status
                <select value={form.data.status} onChange={(e) => set("status", e.target.value as DriverStatus)} className={field}><option value="available">available</option><option value="busy">busy</option><option value="off">off</option></select>
              </label>
              <label className="flex items-center gap-2 pt-5 text-sm font-semibold text-navy"><input type="checkbox" checked={form.data.active} onChange={(e) => set("active", e.target.checked)} /> Active (can be assigned)</label>
              <label className={`${lbl} sm:col-span-2`}>Notes<textarea value={form.data.notes ?? ""} onChange={(e) => set("notes", e.target.value)} rows={2} className={field} /></label>
            </div>
            {msg && <p role="alert" className="mt-3 text-sm text-red-700">{msg}</p>}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button disabled={busy} onClick={() => void save()} className={btnDark}>{busy ? "Saving..." : "Save driver"}</button>
              <button onClick={() => setForm(null)} className={btn}>Cancel</button>
              {form.id && <button onClick={() => { const d = drivers.find((x) => x.id === form.id); if (d) { setForm(null); void del(d); } }} className="ml-auto text-sm font-bold text-red-700">Delete</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
