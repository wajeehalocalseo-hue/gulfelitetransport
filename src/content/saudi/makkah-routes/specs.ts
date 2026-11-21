import type { TownSpec } from "../town-routes/factory";
import { specs1 } from "./specs-1";
import { specs2 } from "./specs-2";
import { specs3 } from "./specs-3";
import { specs4 } from "./specs-4";
import { specs5 } from "./specs-5";
import { specs6 } from "./specs-6";
import { specs7 } from "./specs-7";
import { keywordFaqs } from "./keywords";

/**
 * The Makkah Region route pages ("Makkah to <place> Taxi Service"), in page order. Each page covers both directions.
 * Related routes are given inside each spec: ids of other Makkah pages ("khulais") or existing routes ("riyadh-to-makkah"), checked at build time.
 */
export const makkahSpecs: TownSpec[] = [...specs1, ...specs2, ...specs3, ...specs4, ...specs5, ...specs6, ...specs7].map((s) => ({ ...s, faq: [...s.faq, ...keywordFaqs(s)] }));
