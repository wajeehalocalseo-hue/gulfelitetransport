"use client";

import Link from "next/link";
import { useAdminSettings } from "@/lib/admin-settings";
import { useMemo } from "react";
import { ago, dayKey, followUpState, isRide, kpis, money, perDay, placeOf, pri, tally } from "@/lib/admin-stats";
import { useAdmin } from "./AdminProvider";
import { BarChart, btn, Card, PageHead, Pill, priorityTone, RankList, Stat, statusTone } from "./ui";

export default function OverviewPage() {
  const { rows, loading, reload, now, openRequest } = useAdmin();
  const [settings] = useAdminSettings();
  const k = useMemo(() => kpis(rows, now), [rows, now]);
  const days = useMemo(() => perDay(rows, 30, now), [rows, now]);
  const attention = useMemo(
    () =>
      rows
        .filter((r) => (r.status === "new" && now - new Date(r.created_at).getTime() > settings.slaHours * 3_600_000) || followUpState(r, now) === "overdue" || followUpState(r, now) === "today")
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .slice(0, 6),
    [rows, now, settings.slaHours],
  );
  const today = dayKey(now);
  const schedule = useMemo(
    () => rows.filter((r) => r.preferred_date && r.preferred_date >= today && r.preferred_date <= dayKey(now + 7 * 86_400_000) && !["lost", "spam"].includes(r.status)).sort((a, b) => (a.preferred_date ?? "").localeCompare(b.preferred_date ?? "")).slice(0, 6),
    [rows, now, today],
  );
  const recent = rows.slice(0, 6);
  const funnel = (["new", "contacted", "quoted", "won", "lost"] as const).map((s) => ({ label: s, value: rows.filter((r) => r.status === s).length }));

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-5 py-8">
      <PageHead title="Overview" sub="Your enquiries at a glance (Saudi time).">
        <button onClick={() => void reload()} className={btn}>{loading ? "Loading..." : "Refresh"}</button>
        <Link href="/admin/requests" className={btn}>Open requests</Link>
      </PageHead>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="New (unhandled)" value={k.fresh} sub={k.stale ? `${k.stale} waiting over 24 h` : "Nothing waiting over 24 h"} tone={k.stale ? "text-red-700" : ""} />
        <Stat label="Today" value={k.today} sub={`${k.last7} in the last 7 days`} />
        <Stat
          label="7-day trend"
          value={`${k.trend > 0 ? "+" : ""}${k.trend}%`}
          sub={`vs ${k.prev7} the 7 days before`}
          tone={k.trend < 0 ? "text-red-700" : k.trend > 0 ? "text-green-700" : ""}
        />
        <Stat label="Open pipeline" value={k.open} sub="new + contacted + quoted" />
        <Stat label="Win rate" value={k.winRate == null ? "-" : `${k.winRate}%`} sub={`${k.won} won`} />
        <Stat label="Quoted value" value={money(k.pipeline)} sub="requests in Quoted" />
        <Stat label="Won value" value={money(k.wonValue)} sub="sum of quote amounts" />
        <Stat label="All requests" value={k.total} sub={k.spam ? `${k.spam} spam excluded` : "excluding spam"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Requests, last 30 days" className="lg:col-span-2">
          <BarChart data={days} every={5} />
        </Card>
        <Card title="Pipeline">
          <RankList data={funnel} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Needs attention" action={<Link href="/admin/requests" className="text-sm font-bold text-navy underline decoration-accent decoration-2 underline-offset-4">All</Link>}>
          {attention.length === 0 ? (
            <p className="text-sm text-muted">All caught up. No new request waiting longer than the slow-reply limit and no follow-up due.</p>
          ) : (
            <ul className="divide-y divide-navy/10">
              {attention.map((r) => {
                const f = followUpState(r, now);
                return (
                  <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                    <button onClick={() => openRequest(r.id)} className="min-w-0 text-left">
                      <span className="block truncate font-bold text-navy">{r.name} <span className="font-normal text-muted">· {isRide(r) ? "Ride" : r.service}</span></span>
                      <span className="block text-xs text-muted">{f === "overdue" ? "Follow-up overdue" : f === "today" ? "Follow-up today" : `Waiting ${ago(r.created_at, now)}`}</span>
                    </button>
                    <Pill className={priorityTone[pri(r)]}>{pri(r)}</Pill>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
        <Card title="Latest requests">
          {recent.length === 0 ? (
            <p className="text-sm text-muted">No requests yet. Submit the form on the site to test.</p>
          ) : (
            <ul className="divide-y divide-navy/10">
              {recent.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                  <button onClick={() => openRequest(r.id)} className="min-w-0 text-left">
                    <span className="block truncate font-bold text-navy">{r.name}</span>
                    <span className="block truncate text-xs text-muted">{r.pickup && r.dropoff ? `${r.pickup} → ${r.dropoff}` : r.service} · {ago(r.created_at, now)}</span>
                  </button>
                  <Pill className={statusTone[r.status]}>{r.status}</Pill>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card title="Booked for the next 7 days" action={<Link href="/admin/calendar" className="text-sm font-bold text-navy underline decoration-accent decoration-2 underline-offset-4">Calendar</Link>}>
        {schedule.length === 0 ? (
          <p className="text-sm text-muted">No pickup dates in the next 7 days.</p>
        ) : (
          <ul className="divide-y divide-navy/10">
            {schedule.map((r) => (
              <li key={r.id}>
                <button onClick={() => openRequest(r.id)} className="flex w-full items-center justify-between gap-3 py-2.5 text-left">
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-navy">{r.name} <span className="font-normal text-muted">· {isRide(r) ? "Ride" : r.service}</span></span>
                    <span className="block truncate text-xs text-muted">{r.pickup && r.dropoff ? `${r.pickup} → ${r.dropoff}` : r.details}</span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-navy">{r.preferred_date === today ? "Today" : r.preferred_date}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Top services"><RankList data={tally(rows, (r) => r.service, 6)} /></Card>
        <Card title="Top cities (taxi pages)"><RankList data={tally(rows, placeOf, 6)} empty="Appears when requests come from city pages." /></Card>
        <Card title="Top pages that convert"><RankList data={tally(rows, (r) => r.page_path ?? "", 6)} /></Card>
      </div>
    </div>
  );
}
