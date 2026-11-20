import type { TownSpec } from "./factory";
import { specs1 } from "./specs-1";
import { specs2 } from "./specs-2";
import { specs3 } from "./specs-3";
import { specs4 } from "./specs-4";
import { specs5 } from "./specs-5";
import { specs6 } from "./specs-6";
import { specs7 } from "./specs-7";
import { specs8 } from "./specs-8";

/**
 * Related routes shown on each town page. Ids are either another town page ("al-zulfi") or an existing route ("riyadh-to-buraydah").
 * They are chosen by geography (the same road or the same area), and checked at build time, so a name that does not exist stops the build.
 */
const RELATED: Record<string, string[]> = {
  "al-majmaah": ["al-zulfi", "ghat", "al-artawiyah", "tumair"],
  "al-dawadmi": ["shaqra", "afif", "nifi", "sajir"],
  "al-zulfi": ["al-majmaah", "ghat", "al-artawiyah", "riyadh-to-buraydah"],
  afif: ["al-dawadmi", "al-yamamah", "riyadh-to-taif"],
  "al-yamamah": ["afif", "al-dawadmi", "riyadh-to-madinah"],
  "al-aflaj": ["layla", "al-sih", "hotat-bani-tamim", "wadi-al-dawasir"],
  "al-sih": ["al-aflaj", "layla", "hotat-bani-tamim"],
  shaqra: ["marat", "thadiq", "al-dawadmi", "sajir"],
  "al-quwayiyah": ["al-dawadmi", "al-muzahimiyah", "riyadh-to-taif", "riyadh-to-makkah"],
  "wadi-al-dawasir": ["al-sulayyil", "layla", "riyadh-to-najran", "riyadh-to-abha"],
  "al-muzahimiyah": ["dhurma", "al-quwayiyah", "marat", "riyadh-to-makkah"],
  "ad-dilam": ["riyadh-to-al-kharj", "al-hariq", "hotat-bani-tamim"],
  "al-hariq": ["hotat-bani-tamim", "ad-dilam", "layla"],
  "hotat-bani-tamim": ["al-hariq", "layla", "al-aflaj", "ad-dilam"],
  layla: ["al-aflaj", "al-sih", "hotat-bani-tamim", "al-sulayyil"],
  "al-sulayyil": ["wadi-al-dawasir", "layla", "riyadh-to-najran"],
  rumah: ["riyadh-to-buraydah", "riyadh-to-dammam", "riyadh-to-hail"],
  thadiq: ["huraymila", "shaqra", "tumair", "al-majmaah"],
  huraymila: ["thadiq", "shaqra", "dhurma", "al-muzahimiyah"],
  marat: ["shaqra", "dhurma", "al-muzahimiyah", "al-dawadmi"],
  ghat: ["al-majmaah", "al-zulfi", "al-artawiyah", "riyadh-to-buraydah"],
  tumair: ["thadiq", "al-majmaah", "huraymila", "ghat"],
  sajir: ["al-dawadmi", "nifi", "shaqra", "afif"],
  "al-artawiyah": ["al-majmaah", "ghat", "al-zulfi", "riyadh-to-hail"],
  nifi: ["al-dawadmi", "sajir", "afif", "shaqra"],
  dhurma: ["al-muzahimiyah", "huraymila", "marat", "al-quwayiyah"],
};

/** The Riyadh Region town taxi route pages, in page order (see factory.ts and build.ts townRoutePages). */
export const townSpecs: TownSpec[] = [...specs1, ...specs2, ...specs3, ...specs4, ...specs5, ...specs6, ...specs7, ...specs8].map((s) => ({ ...s, related: RELATED[s.id] ?? s.related }));
