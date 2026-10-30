import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import ServiceScene from "./ServiceScene";

const exts = ["webp", "avif", "jpg", "jpeg", "png"];

/** Finds a real photo for a service at build time: public/images/services/<slug>.<ext> */
function findPhoto(slug: string): string | null {
  for (const e of exts) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", "services", `${slug}.${e}`))) {
      return `/images/services/${slug}.${e}`;
    }
  }
  return null;
}

/**
 * Shows a real photo if one has been added for this service, otherwise the built-in illustration.
 * To use real photography, drop `<slug>.webp` (or .jpg/.avif/.png, ~1200x750) into public/images/services/.
 */
export default function ServiceImage({
  slug,
  title,
  alt,
  className = "",
  priority = false,
}: {
  slug: string;
  title: string;
  /** Descriptive alt text for a real photo. */
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const photo = findPhoto(slug);
  if (photo) {
    return (
      <Image
        src={photo}
        alt={alt ?? `${title} by Gulf Elite Transport`}
        width={1200}
        height={750}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return <ServiceScene slug={slug} title={title} className={`object-cover ${className}`} />;
}
