/**
 * Central site configuration. Everything SEO-related (canonical URLs,
 * sitemap, robots, Open Graph, JSON-LD) reads from here so there is a
 * single source of truth.
 */

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Estate",
  legalName: "Estate Realty LLC",
  // Falls back to a sensible default so builds work before the env var is set.
  url: normalizeUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.estate-realty.com",
  ),
  title: "Estate — Luxury Homes & Premium Real Estate",
  description:
    "Discover an exclusive collection of luxury homes, waterfront estates, and architectural residences. Curated listings, private viewings, and expert guidance.",
  tagline: "Exceptional homes, effortlessly found.",
  locale: "en_US",
  twitter: "@estaterealty",
  keywords: [
    "luxury real estate",
    "luxury homes for sale",
    "premium properties",
    "waterfront estates",
    "modern villas",
    "penthouses",
    "real estate agency",
  ],
  contact: {
    email: "hello@estate-realty.com",
    phone: "+1-415-555-0188",
    address: {
      street: "120 Marina Boulevard, Suite 400",
      city: "San Francisco",
      region: "CA",
      postalCode: "94123",
      country: "US",
    },
  },
  social: {
    twitter: "https://twitter.com/estaterealty",
    instagram: "https://instagram.com/estaterealty",
    linkedin: "https://www.linkedin.com/company/estaterealty",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/properties" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;
