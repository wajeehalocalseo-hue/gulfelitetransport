/**
 * Sends an event to the Tag Manager data layer. In Tag Manager, a "Custom Event" trigger with the same event name
 * fires a Google Analytics 4 event tag, which can then be marked as a key event in Analytics.
 */
type Params = Record<string, string | number | undefined>;

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push({ event, page_path: window.location.pathname, ...params });
}
