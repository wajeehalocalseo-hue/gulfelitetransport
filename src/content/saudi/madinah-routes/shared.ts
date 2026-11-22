import type { LinkEntry } from "../town-routes/factory";

/** Google Maps entries for places in Madinah: [label, query], so the search carries the city and the country. */
export const mk = (...names: string[]): LinkEntry[] => names.map((n) => [n, `${n}, Madinah, Saudi Arabia`] as [string, string]);

/** Google Maps entries for places inside an area (a city, a governorate or a region) of Saudi Arabia. */
export const sa = (area: string, ...names: string[]): LinkEntry[] => names.map((n) => [n, `${n}, ${area}, Saudi Arabia`] as [string, string]);

/** Google Maps entries for well-known places searched by name and country only. */
export const plain = (...names: string[]): LinkEntry[] => names.map((n) => [n, `${n}, Saudi Arabia`] as [string, string]);
