"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { isRide } from "@/lib/admin-stats";
import { useAdmin } from "./AdminProvider";

type Item = { key: string; label: string; hint: string; run: () => void };

const pages: [string, string][] = [
  ["Overview", "/admin"],
  ["Requests", "/admin/requests"],
  ["Board (pipeline)", "/admin/board"],
  ["Calendar", "/admin/calendar"],
  ["Drivers", "/admin/drivers"],
  ["Customers", "/admin/customers"],
  ["Activity", "/admin/activity"],
  ["Analytics", "/admin/analytics"],
  ["Settings", "/admin/settings"],
];

/** Ctrl/Cmd + K: jump to a page, open a request, or run a quick action. */
export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const { rows, openRequest, reload, theme, setTheme, signOut } = useAdmin();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const items = useMemo<Item[]>(() => {
    const needle = q.trim().toLowerCase();
    const go = (label: string, href: string): Item => ({ key: href, label: `Go to ${label}`, hint: "Page", run: () => router.push(href) });
    const actions: Item[] = [
      { key: "refresh", label: "Refresh data", hint: "Action", run: () => void reload() },
      { key: "theme", label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode", hint: "Action", run: () => setTheme(theme === "dark" ? "light" : "dark") },
      { key: "out", label: "Sign out", hint: "Action", run: () => void signOut() },
    ];
    const base = [...pages.map(([l, h]) => go(l, h)), ...actions].filter((i) => !needle || i.label.toLowerCase().includes(needle));
    const found = needle
      ? rows
          .filter((r) => [r.name, r.phone, r.email, r.business, r.pickup, r.dropoff, r.service, r.details].some((v) => v?.toLowerCase().includes(needle)))
          .slice(0, 8)
          .map<Item>((r) => ({ key: r.id, label: `${r.name} · ${isRide(r) ? "Ride" : r.service}`, hint: r.status, run: () => openRequest(r.id) }))
      : [];
    return [...found, ...base].slice(0, 12);
  }, [q, rows, router, reload, theme, setTheme, signOut, openRequest]);

  const pick = (i: Item | undefined) => {
    if (!i) return;
    onClose();
    i.run();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-navy/60" />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setCursor(0); }}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, items.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
            else if (e.key === "Enter") pick(items[cursor]);
          }}
          placeholder="Search requests, customers, pages or actions..."
          aria-label="Search"
          className="w-full border-b border-navy/10 bg-transparent px-5 py-4 text-base text-navy outline-none placeholder:text-muted"
        />
        <ul role="listbox" className="max-h-80 overflow-y-auto p-2">
          {items.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nothing found.</li>}
          {items.map((i, n) => (
            <li key={i.key} role="option" aria-selected={n === cursor}>
              <button
                onClick={() => pick(i)}
                onMouseEnter={() => setCursor(n)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${n === cursor ? "bg-accent text-navy" : "text-navy"}`}
              >
                <span className="truncate font-semibold">{i.label}</span>
                <span className="shrink-0 text-xs capitalize opacity-70">{i.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
