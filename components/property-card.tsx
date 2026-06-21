import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPrice } from "@/lib/utils";
import {
  type Property,
  statusLabels,
  typeLabels,
} from "@/lib/properties";

export function PropertyCard({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  const priceLabel =
    property.status === "for-rent"
      ? `${formatPrice(property.price)}/mo`
      : formatPrice(property.price);

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-200 hover:shadow-xl hover:shadow-black/5">
      <Link
        href={`/properties/${property.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`${property.title} — ${priceLabel}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={property.images[0].url}
            alt={property.images[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge variant="accent">{statusLabels[property.status]}</Badge>
            <Badge variant="outline" className="bg-background/90">
              {typeLabels[property.type]}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="font-display text-xl font-semibold text-accent">
          {priceLabel}
        </p>
        <h3 className="mt-1 font-display text-lg font-medium">
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

        <dl className="mt-4 flex items-center gap-5 border-t border-border pt-4 text-sm text-foreground/80">
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
        </dl>
      </div>
    </article>
  );
}
