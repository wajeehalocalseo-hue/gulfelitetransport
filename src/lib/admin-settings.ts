"use client";

import { useSyncExternalStore } from "react";

/** Admin preferences, stored in this browser (no database changes needed). */
export type AdminSettings = {
  /** A new request is flagged "slow" after this many hours without a response. */
  slaHours: number;
  /** Play a sound and show a desktop notification when a new request arrives. */
  sound: boolean;
  desktopNotify: boolean;
  /** Message templates. Placeholders: {name} {service} {route} {date} {amount} {ref} */
  waTemplate: string;
  quoteWaTemplate: string;
  emailTemplate: string;
  /** Email that carries a quotation (placeholders as above). */
  quoteEmailTemplate: string;
  /** WhatsApp job message sent to a driver. Extra placeholders: {driver} {day} {pickup} {dropoff} {phone} {details} */
  driverTemplate: string;
  /** Printed at the bottom of a quotation. */
  quoteTerms: string;
};

export const defaultSettings: AdminSettings = {
  slaHours: 1,
  sound: true,
  desktopNotify: false,
  waTemplate: "Hello {name}, this is Gulf Elite Transport Group about your {service} request{route}{date}. Could you confirm the details so we can send you the price and arrange it?",
  quoteWaTemplate: "Hello {name}, thank you for contacting Gulf Elite Transport Group. For your {service} request{route}{date} our price is SAR {amount}. Reply YES to confirm and we will arrange it.",
  emailTemplate: "Hello {name},\n\nThank you for contacting Gulf Elite Transport Group about your {service} request{route}{date}.\n\n[Add the quote or your questions here]\n\nKind regards,\nGulf Elite Transport Group",
  quoteEmailTemplate: "Hello {name},\n\nThank you for contacting Gulf Elite Transport Group. Our quotation {ref} for your {service} request{route}{date} is SAR {amount}.\n\nPlease reply to this email to confirm and we will arrange everything.\n\nKind regards,\nGulf Elite Transport Group",
  driverTemplate: "New ride {ref}\nDate: {day}\nCustomer: {name} ({phone})\nPickup: {pickup}\nDrop-off: {dropoff}\nDetails: {details}\n\nPlease reply to confirm.",
  quoteTerms: "The price is confirmed before the service is booked. Please reply to this quotation to confirm.",
};

const KEY = "ge_admin_settings";
const listeners = new Set<() => void>();
let cache: { raw: string | null; value: AdminSettings } | null = null;

function read(): AdminSettings {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    /* ignore */
  }
  if (cache && cache.raw === raw) return cache.value;
  let value = defaultSettings;
  try {
    if (raw) value = { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  cache = { raw, value };
  return value;
}

export function useAdminSettings(): [AdminSettings, (patch: Partial<AdminSettings>) => void] {
  const settings = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => defaultSettings,
  );
  const update = (patch: Partial<AdminSettings>) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...read(), ...patch }));
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  };
  return [settings, update];
}

export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");
}
