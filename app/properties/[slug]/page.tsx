import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Maximize,
  Car,
  CalendarDays,
  MapPin,
  Compass,
  Check,
  BadgeCheck,
  TrendingUp,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { PropertyMap } from "@/components/property-map";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatNumber, formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import {
  getAllProperties,
  getAllPropertySlugs,
  getPropertyBySlug,
  statusLabels,
  typeLabels,
  pricePerSqft,
} from "@/lib/properties";
import { breadcrumbSchema, propertySchema } from "@/lib/structured-data";

// Pre-render one static page per property at build time (SSG).
export function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }));
}

// Static export: only the params above exist; block anything else.
export const dynamicParams = false;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const path = `/properties/${property.slug}`;
  const priceLabel =
    property.status === "for-rent"
      ? `${formatPrice(property.price, property.currency)}/mo`
      : formatPrice(property.price, property.currency);
  const title = `${property.title} — ${property.address.city}, ${property.address.region}`;
  const description = `${property.excerpt} ${property.bedrooms} bed · ${property.bathrooms} bath · ${formatNumber(property.area)} sqft · ${priceLabel}.`;

  return {
    title,
    description,
    alternates: { canonical: path },
    keywords: [
      property.title,
      `${typeLabels[property.type]} for ${property.status === "for-rent" ? "rent" : "sale"}`,
      `${property.address.city} luxury homes`,
      "luxury real estate",
    ],
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      images: property.images.map((img) => ({
        url: img.url,
        alt: img.alt,
        width: 1600,
        height: 1067,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.images[0].url],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const priceLabel =
    property.status === "for-rent"
      ? `${formatPrice(property.price, property.currency)}/mo`
      : formatPrice(property.price, property.currency);

  const isLand = property.bedrooms === 0 && property.bathrooms === 0;
  const facts = [
    ...(isLand
      ? []
      : [
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
        ]),
    {
      icon: Maximize,
      label: isLand ? "Plot area" : "Interior",
      value: `${formatNumber(property.area)} sqft`,
    },
    { icon: Compass, label: "Facing", value: property.facing },
    { icon: CalendarDays, label: "Year built", value: property.yearBuilt },
    ...(isLand
      ? []
      : [{ icon: Car, label: "Garage", value: `${property.garage} cars` }]),
  ];

  const isSale = property.status !== "for-rent";
  const investment = [
    isSale
      ? {
          label: "Price / sqft",
          value: formatPrice(pricePerSqft(property), property.currency),
        }
      : null,
    property.monthlyIncome != null
      ? {
          label: "Monthly income",
          value: `${formatPrice(property.monthlyIncome, property.currency)}/mo`,
        }
      : null,
    property.rentalYield != null
      ? { label: "Gross yield", value: `${property.rentalYield}%` }
      : null,
  ].filter((x): x is { label: string; value: string } => x !== null);

  const enquiry = whatsappLink(
    `Hi, I'm interested in ${property.title} (${property.propertyId}) — ${priceLabel}. Could you share more details?`,
  );

  const related = getAllProperties()
    .filter((p) => p.slug !== property.slug && p.type === property.type)
    .slice(0, 3);
  const fallbackRelated = getAllProperties()
    .filter((p) => p.slug !== property.slug)
    .slice(0, 3);
  const recommendations = related.length > 0 ? related : fallbackRelated;

  return (
    <>
      <JsonLd
        data={[
          propertySchema(property),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: property.title, path: `/properties/${property.slug}` },
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
              href="/properties"
              className="transition-colors hover:text-accent"
            >
              Properties
            </Link>
          </li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li aria-current="page" className="text-foreground">
            {property.title}
          </li>
        </ol>
      </nav>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-4 lg:grid-rows-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted lg:col-span-2 lg:row-span-2 lg:aspect-auto">
            <Image
              src={property.images[0].url}
              alt={property.images[0].alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {property.images.slice(1, 5).map((img) => (
            <div
              key={img.url}
              className="relative hidden aspect-[16/10] overflow-hidden rounded-lg bg-muted lg:block"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{statusLabels[property.status]}</Badge>
              <Badge variant="muted">{typeLabels[property.type]}</Badge>
              {property.hotDeal && (
                <Badge className="bg-red-600 text-white">Hot deal</Badge>
              )}
              {property.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <BadgeCheck className="size-4" aria-hidden /> Verified
                </span>
              )}
              {property.ownerDirect && (
                <span className="text-xs font-medium text-muted-foreground">
                  Owner-direct
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                ID: {property.propertyId}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden />
              {property.address.street}, {property.address.city},{" "}
              {property.address.region} {property.address.postalCode}
            </p>

            {/* Key facts */}
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="bg-card p-5">
                  <f.icon className="size-5 text-accent" aria-hidden />
                  <dt className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg font-medium">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Investment snapshot */}
            {investment.length > 0 && (
              <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50/60 p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-emerald-800">
                  <TrendingUp className="size-5" aria-hidden /> Investment
                  snapshot
                </h2>
                <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {investment.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs uppercase tracking-wide text-emerald-700/80">
                        {item.label}
                      </dt>
                      <dd className="mt-1 font-display text-xl font-semibold text-emerald-900">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Description */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold">
                About this home
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-foreground/85">
                {property.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold">
                Features &amp; amenities
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="size-4" aria-hidden />
                    </span>
                    <span className="text-sm text-foreground/85">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">
                {property.status === "for-rent" ? "Asking rent" : "Asking price"}
              </p>
              <p className="font-display text-3xl font-semibold text-accent">
                {priceLabel}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <p className="text-sm font-medium">Your advisor</p>
                <p className="mt-2 font-display text-lg">
                  {property.agent.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {property.agent.title}
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={enquiry}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <WhatsAppIcon className="size-4" /> Enquire on WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className={buttonVariants({ variant: "accent" })}
                  >
                    Book a private viewing
                  </Link>
                  <a
                    href={`tel:${property.agent.phone}`}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Phone className="size-4" /> {property.agent.phone}
                  </a>
                  <a
                    href={`mailto:${property.agent.email}?subject=${encodeURIComponent(
                      `Enquiry: ${property.title}`,
                    )}`}
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Mail className="size-4" /> Email advisor
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Location & surroundings */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-accent" aria-hidden />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Location &amp; surroundings
          </h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          {property.address.street}, {property.address.city},{" "}
          {property.address.region} {property.address.postalCode}. Switch between
          satellite, map, and street view, or open directions.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertyMap
              lat={property.geo.lat}
              lng={property.geo.lng}
              title={property.title}
              facing={property.facing}
              heading={property.streetView?.heading ?? 0}
            />
          </div>

          <aside className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-lg font-medium">What&apos;s nearby</h3>
            <ul className="mt-4 space-y-3">
              {property.nearby.map((poi) => (
                <li
                  key={poi.name}
                  className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <span className="flex items-start gap-2 text-sm text-foreground/85">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    {poi.name}
                  </span>
                  <span className="shrink-0 text-sm font-medium text-muted-foreground">
                    {poi.distance}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Related */}
      {recommendations.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              You may also like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
