import Link from "next/link";
import {
  BedDouble,
  Bath,
  Maximize,
  Compass,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import { CardMedia } from "@/components/card-media";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatNumber, formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { type Property, pricePerSqft } from "@/lib/properties";

export function PropertyCard({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  const priceLabel =
    property.status === "for-rent"
      ? `${formatPrice(property.price, property.currency)}/mo`
      : formatPrice(property.price, property.currency);

  const enquiry = whatsappLink(
    `Hi, I'm interested in ${property.title} (${property.propertyId}) — ${priceLabel}. Is it still available?`,
  );

  const isLand = property.bedrooms === 0 && property.bathrooms === 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-200 hover:shadow-xl hover:shadow-black/5">
      <CardMedia property={property} priority={priority} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-xl font-semibold text-accent">
            {priceLabel}
          </p>
          {property.rentalYield != null && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp className="size-3.5" aria-hidden />
              {property.rentalYield}% yield
            </span>
          )}
        </div>
        {property.status !== "for-rent" && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatPrice(pricePerSqft(property), property.currency)}/sqft ·{" "}
            {property.propertyId}
          </p>
        )}

        <h3 className="mt-2 font-display text-lg font-medium">
          <Link
            href={`/properties/${property.slug}`}
            className="transition-colors hover:text-accent"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {property.address.city}, {property.address.region}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {property.verified && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
              <BadgeCheck className="size-4" aria-hidden /> Verified
            </span>
          )}
          {property.ownerDirect && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
              Owner-direct
            </span>
          )}
        </div>

        <dl className="mt-4 flex items-center gap-5 border-t border-border pt-4 text-sm text-foreground/80">
          {isLand ? (
            <>
              <div className="flex items-center gap-1.5">
                <Maximize className="size-4 text-accent" aria-hidden />
                <dt className="sr-only">Plot area</dt>
                <dd>{formatNumber(property.area)} sqft</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="size-4 text-accent" aria-hidden />
                <dt className="sr-only">Facing</dt>
                <dd>{property.facing} facing</dd>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <BedDouble className="size-4 text-accent" aria-hidden />
                <dt className="sr-only">Bedrooms</dt>
                <dd>{property.bedrooms} bd</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="size-4 text-accent" aria-hidden />
                <dt className="sr-only">Bathrooms</dt>
                <dd>{property.bathrooms} ba</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize className="size-4 text-accent" aria-hidden />
                <dt className="sr-only">Interior area</dt>
                <dd>{formatNumber(property.area)} sqft</dd>
              </div>
            </>
          )}
        </dl>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View details
          </Link>
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${property.title} on WhatsApp`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon className="size-4" />
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
