import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllProperties } from "@/lib/properties";

// Required for `output: "export"` — emit a static sitemap at build time.
export const dynamic = "force-static";

/**
 * Generated at build time into /sitemap.xml. Static pages plus one entry per
 * property listing, with priorities and change frequencies tuned for a
 * marketing/listings site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/properties/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = getAllProperties().map(
    (property) => ({
      url: `${base}/properties/${property.slug}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [...staticRoutes, ...propertyRoutes];
}
