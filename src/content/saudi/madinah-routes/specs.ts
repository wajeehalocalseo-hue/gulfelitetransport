import type { TownSpec } from "../town-routes/factory";
import { specs1 } from "./specs-1";
import { specs2 } from "./specs-2";
import { specs3 } from "./specs-3";
import { specs4 } from "./specs-4";
import { specs5 } from "./specs-5";
import { keywordFaqs } from "./keywords";

/**
 * The Madinah route pages ("Madinah to <place> Taxi Service"), in page order. Each page covers both directions.
 * Related routes are given inside each spec: ids of other Madinah pages ("badr") or existing routes ("makkah-to-madinah"), checked at build time.
 */
export const madinahSpecs: TownSpec[] = [...specs1, ...specs2, ...specs3, ...specs4, ...specs5].map((s) => ({ ...s, faq: [...s.faq, ...keywordFaqs(s)] }));
