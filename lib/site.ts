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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  ),
  title: "Estate — Luxury Homes & Premium Real Estate",
  description:
    "Discover an exclusive collection of luxury homes, waterfront estates, and architectural residences. Curated listings, private viewings, and expert guidance.",
  tagline: "Exceptional homes, effortlessly found.",
  locale: "en_US",
  twitter: "@example",
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
    email: "hello@example.com",
    phone: "+1-555-0100",
    // Digits only, including country code — used for wa.me links.
    whatsapp: "15550100",
    address: {
      street: "123 Example Street, Suite 100",
      city: "Anytown",
      region: "CA",
      postalCode: "00000",
      country: "US",
    },
  },
  social: {
    twitter: "https://example.com/",
    instagram: "https://example.com/",
    linkedin: "https://example.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}

/** Build a WhatsApp click-to-chat link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/properties" },
  { title: "Auctions", href: "/auctions" },
  { title: "Investment", href: "/investment" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;
