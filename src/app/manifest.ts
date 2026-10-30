import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Gulf Elite",
    start_url: "/",
    display: "browser",
    background_color: "#f7f9fc",
    theme_color: "#101c2c",
  };
}
