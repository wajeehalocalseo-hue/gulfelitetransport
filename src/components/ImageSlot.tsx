import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { homePhotoSrc } from "./HomePhoto";

const EXTS = ["webp", "avif", "jpg", "jpeg", "png"];

/** The photo for a route slot: public/images/routes/<folder>/<slot>.<ext>, else a home page photo, else null. */
export function routePhotoSrc(folder: string, slot: string, homePhoto?: string): string | null {
  for (const e of EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", "routes", folder, `${slot}.${e}`))) return `/images/routes/${folder}/${slot}.${e}`;
  }
  return homePhoto ? homePhotoSrc(homePhoto) : null;
}

/**
 * A photo with a reserved size. Until a photo is added the slot shows a labelled placeholder of the same size, so the
 * page does not shift when the real image arrives. To replace it, add public/images/routes/<folder>/<slot>.webp
 * (about the width x height given here) and rebuild.
 */
export default function ImageSlot({
  folder,
  slot,
  homePhoto,
  alt,
  label,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  folder: string;
  slot: string;
  homePhoto?: string;
  alt: string;
  /** Text shown in the placeholder, for example "Hero image: Riyadh to Jeddah private taxi". */
  label: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  /** Fill the parent box (it must be positioned). Used for background photos. */
  fill?: boolean;
  sizes?: string;
}) {
  const src = routePhotoSrc(folder, slot, homePhoto);
  if (src) {
    return fill ? (
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
    ) : (
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className={`h-auto w-full object-cover ${className}`} />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      style={fill ? undefined : { aspectRatio: `${Math.max(width / height, 1.9)} / 1` }}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-2/20 via-surface to-accent/25 p-4 text-center ${fill ? "absolute inset-0" : "w-full"} ${className}`}
    >
      {!fill && (
        <svg aria-hidden="true" viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-navy/10">
          <path d="M0 95 C80 40 140 110 220 60 S340 20 400 50" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
          <path d="M0 95 C80 40 140 110 220 60 S340 20 400 50" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" strokeDasharray="8 10" />
        </svg>
      )}
      {!fill && <span className="relative rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-navy/60 ring-1 ring-navy/10">[{label}]</span>}
    </div>
  );
}
