import type { PlacePage } from "../types";
import { adDirahRich } from "./ad-dirah";
import { alAqiqRich } from "./al-aqiq";
import { alHamraRich } from "./al-hamra";
import { alMalazRich } from "./al-malaz";
import { alMalqaRich } from "./al-malqa";
import { alNarjisRich } from "./al-narjis";
import { alSahafahRich } from "./al-sahafah";
import { alYasminRich } from "./al-yasmin";
import { alMohammadiyahRich } from "./al-mohammadiyah";
import { alMurabbaRich } from "./al-murabba";
import { alNaseemRich } from "./al-naseem";
import { alNakheelRich } from "./al-nakheel";
import { alSulaimaniyahRich } from "./al-sulaimaniyah";
import { alWurudRich } from "./al-wurud";
import { diplomaticQuarterRich } from "./diplomatic-quarter";
import { diriyahRich } from "./diriyah";
import { granadaRich } from "./granada";
import { hittinRich } from "./hittin";
import { kafdRich } from "./kafd";
import { olayaRich, type DistrictRichCtx } from "./olaya";
import { alQudsRich } from "./al-quds";
import { alRabwahRich } from "./al-rabwah";
import { alRawdahRich } from "./al-rawdah";
import { alSuwaidiRich } from "./al-suwaidi";
import { qurtubahRich } from "./qurtubah";

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
  "al-sulaimaniyah": alSulaimaniyahRich,
  "al-wurud": alWurudRich,
  "al-mohammadiyah": alMohammadiyahRich,
  "al-nakheel": alNakheelRich,
  "al-malqa": alMalqaRich,
  "al-yasmin": alYasminRich,
  "al-narjis": alNarjisRich,
  "al-sahafah": alSahafahRich,
  qurtubah: qurtubahRich,
  "al-rawdah": alRawdahRich,
  "al-suwaidi": alSuwaidiRich,
  "al-aqiq": alAqiqRich,
  "al-hamra": alHamraRich,
  "al-quds": alQudsRich,
  "al-rabwah": alRabwahRich,
  "al-naseem": alNaseemRich,
  granada: granadaRich,
};

export const districtRich = (id: string, ctx: DistrictRichCtx): DistrictRich | undefined => registry[id]?.(ctx);