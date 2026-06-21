import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Required for `output: "export"` — emit a static manifest at build time.
export const dynamic = "force-static";

/** PWA web app manifest -> /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#16140f",
    categories: ["business", "lifestyle", "shopping"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
