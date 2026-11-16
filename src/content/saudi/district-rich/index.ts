import type { PlacePage } from "../types";
import { kafdRich } from "./kafd";
import { olayaRich, type DistrictRichCtx } from "./olaya";

export type DistrictRich = Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string };

/** Districts with a hand-written page. Every other district uses the generic template in riyadh-districts.ts. */
const registry: Record<string, (ctx: DistrictRichCtx) => DistrictRich> = {
  olaya: olayaRich,
  "king-abdullah-financial-district": kafdRich,
};

export const districtRich = (id: string, ctx: DistrictRichCtx): DistrictRich | undefined => registry[id]?.(ctx);