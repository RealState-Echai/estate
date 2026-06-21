"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImageIcon, Map as MapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mapEmbedSrc } from "@/lib/maps";
import { type Property, statusLabels, typeLabels } from "@/lib/properties";

export function CardMedia({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  const [mode, setMode] = useState<"photo" | "map">("photo");

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      {mode === "photo" ? (
        <>
          <Image
            src={property.images[0].url}
            alt={property.images[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          {/* Click-through to detail page (photo mode only) */}
          <Link
            href={`/properties/${property.slug}`}
            className="absolute inset-0"
            aria-label={`View ${property.title}`}
          />
        </>
      ) : (
        <iframe
          src={mapEmbedSrc("satellite", property.geo.lat, property.geo.lng)}
          title={`Map of ${property.title}`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}

      {/* Status / type / hot-deal badges (don't block the link) */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-wrap gap-2">
        <Badge variant="accent">{statusLabels[property.status]}</Badge>
        <Badge variant="outline" className="bg-background/90">
          {typeLabels[property.type]}
        </Badge>
        {property.hotDeal && (
          <Badge className="bg-red-600 text-white">Hot deal</Badge>
        )}
      </div>

      {/* Photo / Map toggle */}
      <div className="absolute right-3 top-3 z-20 inline-flex rounded-md bg-background/90 p-0.5 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={() => setMode("photo")}
          aria-pressed={mode === "photo"}
          aria-label="Show photo"
          className={cn(
            "inline-flex size-8 cursor-pointer items-center justify-center rounded transition-colors",
            mode === "photo"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <ImageIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setMode("map")}
          aria-pressed={mode === "map"}
          aria-label="Show map"
          className={cn(
            "inline-flex size-8 cursor-pointer items-center justify-center rounded transition-colors",
            mode === "map"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <MapIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
