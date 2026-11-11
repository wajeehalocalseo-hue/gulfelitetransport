"use client";

import { useMemo, useState } from "react";
import { avgFirstResponseHours, heatmap, isRide, kpis, money, pageOf, perDay, perHour, perWeek, perWeekday, placeOf, tally } from "@/lib/admin-stats";
import { useAdmin } from "./AdminProvider";
import { BarChart, btn, btnDark, Card, PageHead, RankList, Stat } from "./ui";

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
  { label: "All time", days: 0 },
] as const;

export default function AnalyticsPage() {
  const { rows, events, now } = useAdmin();
  const [range, setRange] = useState<number>(30);

  const scoped = useMemo(
    () => rows.filter((r) => r.status !== "spam" && (range === 0 || now - new Date(r.created_at).getTime() <= range * 86_400_000)),
    [rows, range, now],
  );
  const k = useMemo(() => kpis(scoped, now), [scoped, now]);
  const resp = useMemo(() => avgFirstResponseHours(scoped, events), [scoped, events]);
  const series = useMemo(() => (range === 90 || range === 0 ? perWeek(scoped, range === 0 ? 26 : 13, now) : perDay(scoped, range, now)), [scoped, range, now]);
  const rides = scoped.filter(isRide).length;

  const byService = useMemo(() => {
    const names = [...new Set(scoped.map((r) => r.service))];
    return names
      .map((s) => {
        const list = scoped.filter((r) => r.service === s);
        const won = list.filter((r) => r.status === "won").length;
        const lost = list.filter((r) => r.status === "lost").length;
        return { s, n: list.length, won, rate: won + lost ? Math.round((won / (won + lost)) * 100) : null };
      })
      .sort((a, b) => b.n - a.n)
      .slice(0, 10);
  }, [scoped]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-5 py-8">
      <PageHead title="Analytics" sub="Where enquiries come from and how well they convert (Saudi time, spam excluded).">
        {RANGES.map((r) => (
          <button key={r.label} onClick={() => setRange(r.days)} className={range === r.days ? btnDark : btn}>{r.label}</button>
        ))}
      </PageHead>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Requests" value={scoped.length} sub={`${rides} taxi rides · ${scoped.length - rides} other services`} />
        <Stat label="Win rate" value={k.winRate == null ? "-" : `${k.winRate}%`} sub={`${k.won} won`} />
        <Stat label="Avg first response" value={resp == null ? "-" : resp < 1 ? `${Math.round(resp * 60)} min` : `${resp.toFixed(1)} h`} sub="until status leaves New" />
        <Stat label="Won value" value={money(k.wonValue)} sub={`${money(k.pipeline)} still quoted`} />
      </div>

      <Card title={range === 90 || range === 0 ? "Requests per week" : "Requests per day"}>
        <BarChart data={series} every={Math.ceil(series.length / 8)} height={180} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="By hour of day (Saudi time)"><BarChart data={perHour(scoped)} every={3} /></Card>
        <Card title="By weekday"><BarChart data={perWeekday(scoped)} /></Card>
      </div>

      <Card title="When requests arrive (weekday by hour, Saudi time)">
        <div className="overflow-x-auto">
          {(() => {
            const m = heatmap(scoped);
            const max = Math.max(1, ...m.flat());
            return (
              <div className="min-w-[520px] text-[10px] text-muted">
                <div className="ml-10 grid grid-cols-24 gap-0.5" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
                  {Array.from({ length: 24 }, (_, h) => <span key={h} className="text-center">{h % 3 === 0 ? h : ""}</span>)}
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                  <div key={d} className="mt-0.5 flex items-center gap-2">
                    <span className="w-8">{d}</span>
                    <div className="grid flex-1 gap-0.5" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
                      {m[i].map((v, h) => (
                        <span key={h} title={`${d} ${String(h).padStart(2, "0")}:00 - ${v}`} className="h-5 rounded-sm bg-accent" style={{ opacity: v ? 0.2 + 0.8 * (v / max) : 0.06 }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Top cities"><RankList data={tally(scoped, placeOf, 10)} empty="Appears when requests come from city pages." /></Card>
        <Card title="Top landing pages"><RankList data={tally(scoped, pageOf, 10)} /></Card>
        <Card title="Top pickup places"><RankList data={tally(scoped.filter(isRide), (r) => (r.pickup ?? "").trim(), 10)} /></Card>
      </div>

      <Card title="Services and conversion">
        {byService.length === 0 ? (
          <p className="text-sm text-muted">No data yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted">
                <tr><th className="py-2 pr-4">Service</th><th className="py-2 pr-4">Requests</th><th className="py-2 pr-4">Won</th><th className="py-2">Win rate</th></tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {byService.map((r) => (
                  <tr key={r.s}>
                    <td className="py-2.5 pr-4 font-semibold text-navy">{r.s}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{r.n}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{r.won}</td>
                    <td className="py-2.5 tabular-nums">{r.rate == null ? "-" : `${r.rate}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <p className="text-xs text-muted">Visitor traffic and search rankings are in Google Search Console, Clarity and GTM. This page covers enquiries received through the website forms.</p>
    </div>
  );
}
