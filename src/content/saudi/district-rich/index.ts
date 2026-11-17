import type { PlacePage } from "../types";
import { adDirahRich } from "./ad-dirah";
import { alMalazRich } from "./al-malaz";
import { alMurabbaRich } from "./al-murabba";
import { diplomaticQuarterRich } from "./diplomatic-quarter";
import { diriyahRich } from "./diriyah";
import { hittinRich } from "./hittin";
import { kafdRich } from "./kafd";
import { olayaRich, type DistrictRichCtx } from "./olaya";

export type DistrictRich = Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string };

/** Districts with a hand-written page. Every other district uses the generic template in riyadh-districts.ts. */
const registry: Record<string, (ctx: DistrictRichCtx) => DistrictRich> = {
  olaya: olayaRich,
  "king-abdullah-financial-district": kafdRich,
  "diplomatic-quarter": diplomaticQuarterRich,
  diriyah: diriyahRich,
  hittin: hittinRich,
  "ad-dirah": adDirahRich,
  "al-murabba": alMurabbaRich,
  "al-malaz": alMalazRich,
};

export const districtRich = (id: string, ctx: DistrictRichCtx): DistrictRich | undefined => registry[id]?.(ctx);