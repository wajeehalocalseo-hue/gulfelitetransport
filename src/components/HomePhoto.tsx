import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";

const EXTS = ["webp", "avif", "jpg", "jpeg", "png"];

/** The photo for a home page slot, if one has been added: public/images/home/<name>.<ext> */
export function homePhotoSrc(name: string): string | null {
  for (const e of EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", "home", `${name}.${e}`))) return `/images/home/${name}.${e}`;
  }
  return null;
}

/**
 * A home page photo. Renders nothing until the file exists, so the layout works with or without it.
 * Add the file as public/images/home/<name>.webp (about the size given by width and height) and it appears.
 */
export default function HomePhoto({
  name,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fallback = null,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Shown while no photo has been added for this slot. */
  fallback?: ReactNode;
}) {
  const src = homePhotoSrc(name);
  if (!src) return <>{fallback}</>;
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className={className} />;
}
