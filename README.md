# Estate — Luxury Real Estate (Next.js, Static Site Generation)

A production-ready, SEO-optimized luxury real estate website built with
**Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and shadcn-style
components. The entire site is **statically generated** and exported to plain
HTML/CSS/JS in `./out`, so it can be hosted on any static host (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3 + CloudFront, Nginx).

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000

npm run build        # static export -> ./out
npm run serve        # preview the exported ./out locally
```

Set your production domain before building (used for canonical URLs, sitemap,
robots, Open Graph, and JSON-LD):

```bash
cp .env.example .env
# edit NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

## What's included for SEO

| Area | Implementation |
| --- | --- |
| **Static rendering (SSG)** | `output: "export"` — every route pre-rendered to HTML. Property pages via `generateStaticParams`. |
| **Per-page metadata** | Title templates, descriptions, keywords, canonical URLs via the Metadata API + `generateMetadata`. |
| **Open Graph / Twitter** | Per-page OG/Twitter tags + dynamically generated OG **images** (`opengraph-image.tsx`) for the site and every listing. |
| **Structured data (JSON-LD)** | `RealEstateAgent`, `WebSite` + `SearchAction`, `SingleFamilyResidence`/`Offer`, `BreadcrumbList`, `ItemList`. |
| **Sitemap** | `app/sitemap.ts` → `/sitemap.xml`, includes every listing. |
| **Robots** | `app/robots.ts` → `/robots.txt` with sitemap reference. |
| **PWA manifest** | `app/manifest.ts` → `/manifest.webmanifest`. |
| **Icons** | `app/icon.svg` + generated `apple-icon`. |
| **Performance** | `next/image` (responsive `sizes`, lazy by default, priority on hero), `next/font` self-hosting, minimal client JS. |
| **Accessibility** | Skip link, semantic landmarks, labelled inputs, visible focus rings, `prefers-reduced-motion`, 44px touch targets. |

## Project structure

```
app/
  layout.tsx                  Root layout, fonts, global metadata + JSON-LD
  page.tsx                    Home
  properties/page.tsx         Listings index (search/filter/sort)
  properties/[slug]/page.tsx  Property detail (SSG) + per-page metadata + JSON-LD
  about, contact              Marketing pages
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, icon.svg, apple-icon.tsx
components/                   UI primitives + site chrome + property components
lib/
  site.ts                     Single source of truth for site/SEO config
  properties.ts               Static listings data + query helpers
  structured-data.ts          Schema.org JSON-LD builders
  utils.ts                    cn(), formatters
```

## Adding a property

Append an entry to the `properties` array in `lib/properties.ts`. The listings
grid, detail page, sitemap, OG image, and JSON-LD all update automatically.

## Deploy

After `npm run build`, deploy the `./out` directory to any static host. Example
(Netlify): build command `npm run build`, publish directory `out`.

## Post-launch SEO checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain and rebuild.
- [ ] Submit `/sitemap.xml` in Google Search Console & Bing Webmaster Tools.
- [ ] Validate listings in the [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Replace placeholder Unsplash imagery and agency details in `lib/site.ts` / `lib/properties.ts`.
- [ ] Wire the contact form to a real endpoint (see `components/contact-form.tsx`).
```
