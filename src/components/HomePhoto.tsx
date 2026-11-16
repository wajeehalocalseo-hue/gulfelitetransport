import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { preload } from "react-dom";
import type { ReactNode } from "react";

const EXTS = ["webp", "avif", "jpg", "jpeg", "png"];

/** The photo for a home page slot, if one has been added: public/images/home/<name>.<ext> */
export function homePhotoSrc(name: string): string | null {
  for (const e of EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", "home", `${name}.${e}`))) return `/images/home/${name}.${e}`;
  }
  return null;
}

/** Smaller copies of a photo (name-640.webp, name-960.webp) used for phones and small screens, when they exist. */
function variants(name: string): { src: string; w: number }[] {
  return [640, 960]
    .filter((w) => fs.existsSync(path.join(process.cwd(), "public", "images", "home", `${name}-${w}.webp`)))
    .map((w) => ({ src: `/images/home/${name}-${w}.webp`, w }));
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
  fill = false,
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
  /** Fill the parent box (for a background photo). The parent must be positioned. */
  fill?: boolean;
}) {
  const src = homePhotoSrc(name);
  if (!src) return <>{fallback}</>;
  const v = variants(name);
  if (v.length) {
    // Responsive copies: the browser picks the smallest file that fits the screen.
    const srcSet = [...v.map((x) => `${x.src} ${x.w}w`), `${src} ${width}w`].join(", ");
    if (priority) preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={fill ? `absolute inset-0 h-full w-full ${className}` : className}
      />
    );
  }
  if (fill) return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className={className} />;
}
