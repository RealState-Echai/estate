import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Gavel,
  MapPin,
  Maximize,
  Wallet,
  CalendarClock,
  Eye,
  ClipboardCheck,
  Building2,
  Landmark,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PropertyMap } from "@/components/property-map";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatPrice, formatAuctionWindow, formatDate } from "@/lib/utils";
import { whatsappLink, siteConfig, absoluteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";
import {
  getAllAuctionSlugs,
  getAuctionBySlug,
  auctionStatus,
  assetTypeLabels,
  statusLabels,
  outcomeLabels,
} from "@/lib/auctions";

export function generateStaticParams() {
  return getAllAuctionSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuctionBySlug(slug);
  if (!a) return {};
  const path = `/auctions/${a.slug}`;
  const title = `${a.borrower} — ${a.title}`;
  const description = `${a.areaLabel} at ${a.address.area}, ${a.address.city}. Reserve ${formatPrice(a.reservePrice, "INR")}, EMD ${formatPrice(a.emd, "INR")}. E-auction ${formatDate(a.start)}.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function AuctionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const auction = getAuctionBySlug(slug);
  if (!auction) notFound();

  const status = auctionStatus(auction);
  const sold = status === "completed" && auction.result?.outcome === "sold";

  const register = whatsappLink(
    `I'd like to register for auction ${auction.lotNo} — ${auction.borrower} (${auction.title}). Reserve price ${formatPrice(auction.reservePrice, "INR")}.`,
  );

  const facts = [
    { icon: Maximize, label: "Area", value: auction.areaLabel },
    {
      icon: Building2,
      label: "Asset type",
      value: assetTypeLabels[auction.assetType],
    },
    { icon: Landmark, label: "Authority", value: auction.authority },
    { icon: Gavel, label: "Lot number", value: auction.lotNo },
  ];

  const dates = [
    {
      icon: CalendarClock,
      label: "E-auction",
      value: formatAuctionWindow(auction.start, auction.end),
    },
    auction.inspectionDate
      ? {
          icon: Eye,
          label: "Inspection date",
          value: formatDate(auction.inspectionDate),
        }
      : null,
    auction.emdLastDate
      ? {
          icon: ClipboardCheck,
          label: "EMD submission by",
          value: formatDate(auction.emdLastDate),
        }
      : null,
  ].filter((x): x is { icon: typeof Eye; label: string; value: string } => x !== null);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${auction.borrower} — ${auction.title}`,
    description: auction.excerpt,
    startDate: auction.start,
    endDate: auction.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    url: absoluteUrl(`/auctions/${auction.slug}`),
    location: {
      "@type": "Place",
      name: `${auction.address.area}, ${auction.address.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: auction.address.area,
        addressLocality: auction.address.city,
        addressRegion: auction.address.region,
        postalCode: auction.address.postalCode,
        addressCountry: auction.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: auction.geo.lat,
        longitude: auction.geo.lng,
      },
    },
    organizer: { "@type": "Organization", name: auction.authority },
    offers: {
      "@type": "Offer",
      price: auction.reservePrice,
      priceCurrency: "INR",
      availability:
        status === "completed"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      url: absoluteUrl(`/auctions/${auction.slug}`),
    },
  };

  return (
    <>
      <JsonLd
        data={[
          eventSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Auctions", path: "/auctions" },
            { name: auction.borrower, path: `/auctions/${auction.slug}` },
          ]),
        ]}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li>
            <Link
              href="/auctions"
              className="transition-colors hover:text-accent"
            >
              Auctions
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li aria-current="page" className="text-foreground">
            {auction.borrower}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {status === "live" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80" />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              Live now
            </span>
          ) : status === "completed" && auction.result ? (
            <Badge variant={sold ? "accent" : "muted"}>
              {outcomeLabels[auction.result.outcome]}
            </Badge>
          ) : (
            <Badge>{statusLabels[status]}</Badge>
          )}
          <Badge variant="muted">{assetTypeLabels[auction.assetType]}</Badge>
          <span className="text-xs text-muted-foreground">{auction.lotNo}</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          {auction.borrower}
        </h1>
        <p className="mt-2 text-lg text-foreground/80">{auction.title}</p>
        <p className="mt-1 flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4 text-accent" aria-hidden />
          {auction.address.area}, {auction.address.city},{" "}
          {auction.address.region} {auction.address.postalCode}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Map — primary view for distressed assets */}
            <PropertyMap
              lat={auction.geo.lat}
              lng={auction.geo.lng}
              title={auction.title}
              heading={auction.streetViewHeading ?? 0}
            />
            {auction.approxGeo && (
              <p className="mt-2 text-xs text-muted-foreground">
                Map location is approximate — confirm the exact boundary from
                the official auction notice and site inspection.
              </p>
            )}

            {/* Key facts */}
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="bg-card p-5">
                  <f.icon className="size-5 text-accent" aria-hidden />
                  <dt className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>

            {/* Description */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold">
                About this lot
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-foreground/85">
                {auction.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold">
                Auction schedule
              </h2>
              <ul className="mt-4 space-y-3">
                {dates.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-center justify-between gap-4 rounded-md border border-border bg-card p-4"
                  >
                    <span className="flex items-center gap-3 text-sm text-muted-foreground">
                      <d.icon className="size-4 text-accent" aria-hidden />
                      {d.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {d.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">
                {sold ? "Sold for" : "Reserve price"}
              </p>
              <p className="font-display text-3xl font-semibold text-accent">
                {formatPrice(
                  sold && auction.result?.salePrice
                    ? auction.result.salePrice
                    : auction.reservePrice,
                  "INR",
                )}
              </p>

              <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Wallet className="size-4 text-accent" /> EMD
                  </dt>
                  <dd className="font-medium">
                    {formatPrice(auction.emd, "INR")}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Maximize className="size-4 text-accent" /> Area
                  </dt>
                  <dd className="font-medium">{auction.areaLabel}</dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <CalendarClock className="size-4 text-accent" /> Date
                  </dt>
                  <dd className="text-right font-medium">
                    {formatAuctionWindow(auction.start, auction.end)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                {status !== "completed" ? (
                  <>
                    <a
                      href={register}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      <WhatsAppIcon className="size-4" /> Register / enquire
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <Phone className="size-4" /> {siteConfig.contact.phone}
                    </a>
                  </>
                ) : (
                  <Link
                    href="/auctions"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    View other auctions
                  </Link>
                )}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Sold on an &ldquo;as is where is&rdquo; basis. Verify all terms
                in the official auction notice before bidding.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
