import type { Section, SectionImage } from "../types";

/**
 * Gives a district page its photo slots. The slots are placeholders until the owner adds
 * public/images/routes/riyadh-districts/<page>/<slot>.webp, so the layout does not shift when the photo arrives.
 * The alt text describes the place, not the company fleet.
 *
 * With no `custom` argument three slots (area, journey, pickup) go on the first, middle and last written section (text or items).
 * With `custom` (section id -> image) only those sections get a slot, so a page can name its own files and places.
 */
export function addImages(sections: Section[], name: string, custom?: Record<string, SectionImage>, count: 3 | 4 = 3): Section[] {
  if (custom) return sections.map((s) => (custom[s.id] ? { ...s, image: custom[s.id] } : s));
  const place = name.replace(/\s*\(.*\)\s*$/, "");
  const idx = sections.map((s, i) => ({ s, i })).filter(({ s }) => (s.kind === "text" || s.kind === "items") && s.id !== "limits" && s.id !== "whatsapp").map(({ i }) => i);
  const at = count === 4 ? [0, Math.floor(idx.length / 3), Math.floor((2 * idx.length) / 3), idx.length - 1] : [0, Math.floor(idx.length / 2), idx.length - 1];
  const pick = Array.from(new Set(at.map((k) => idx[k]))).filter((n): n is number => n !== undefined);
  const specs = [
    { slot: "area", alt: `Streets and buildings in ${place}, Riyadh`, label: `Photo: ${place} area` },
    { slot: "journey", alt: `A private journey to or from ${place}, Riyadh`, label: `Photo: journey from ${place}` },
    { slot: "street", alt: `A residential street in ${place}, Riyadh`, label: `Photo: street in ${place}` },
    { slot: "pickup", alt: `A pickup meeting point in ${place}, Riyadh`, label: `Photo: pickup point in ${place}` },
  ].filter((x) => count === 4 || x.slot !== "street");
  return sections.map((s, i) => {
    const k = pick.indexOf(i);
    return k >= 0 ? { ...s, image: specs[k] } : s;
  });
}
