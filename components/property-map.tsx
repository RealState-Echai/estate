"use client";

import { useRef, useState } from "react";
import {
  Layers,
  Map as MapIcon,
  PersonStanding,
  Maximize2,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type View = "satellite" | "map" | "street";

// Optional Google Maps Embed API key. When present, the official (higher
// quality, ToS-compliant) Embed API is used; otherwise we fall back to the
// keyless google.com/maps embed URLs so the map works out of the box.
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

function buildSrc(
  view: View,
  lat: number,
  lng: number,
  heading: number,
): string {
  const ll = `${lat},${lng}`;
  if (KEY) {
    if (view === "street") {
      return `https://www.google.com/maps/embed/v1/streetview?key=${KEY}&location=${ll}&heading=${heading}&pitch=0&fov=90`;
    }
    const maptype = view === "satellite" ? "satellite" : "roadmap";
    const zoom = view === "satellite" ? 18 : 16;
    return `https://www.google.com/maps/embed/v1/view?key=${KEY}&center=${ll}&zoom=${zoom}&maptype=${maptype}`;
  }
  // Keyless fallbacks
  if (view === "street") {
    return `https://maps.google.com/maps?q=&layer=c&cbll=${ll}&cbp=11,${heading},0,0,0&output=svembed`;
  }
  const t = view === "satellite" ? "h" : "m"; // h = hybrid, m = roadmap
  const z = view === "satellite" ? 18 : 16;
  return `https://maps.google.com/maps?q=${ll}&t=${t}&z=${z}&hl=en&output=embed`;
}

const tabs: { id: View; label: string; icon: typeof MapIcon }[] = [
  { id: "satellite", label: "Satellite", icon: Layers },
  { id: "map", label: "Map", icon: MapIcon },
  { id: "street", label: "Street View", icon: PersonStanding },
];

export function PropertyMap({
  lat,
  lng,
  title,
  facing,
  heading = 0,
}: {
  lat: number;
  lng: number;
  title: string;
  facing: string;
  heading?: number;
}) {
  const [view, setView] = useState<View>("satellite");
  const containerRef = useRef<HTMLDivElement>(null);

  const coords = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  function goFullscreen() {
    containerRef.current?.requestFullscreen?.();
  }

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3">
        <div
          role="tablist"
          aria-label="Map view"
          className="inline-flex rounded-md bg-muted p-1"
        >
          {tabs.map((t) => {
            const active = view === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setView(t.id)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                  active
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <t.icon className="size-4" aria-hidden />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goFullscreen}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="View map fullscreen"
            title="Fullscreen"
          >
            <Maximize2 className="size-4" />
          </button>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Navigation className="size-4" /> Directions
          </a>
        </div>
      </div>

      {/* Map frame */}
      <div className="relative aspect-[16/10] w-full bg-muted">
        <iframe
          // key forces a fresh load when switching views
          key={view}
          src={buildSrc(view, lat, lng, heading)}
          title={`${title} — ${view} view`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Footer info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-3 text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">Coordinates:</span>{" "}
            {coords}
          </span>
          <span>
            <span className="font-medium text-foreground">Facing:</span> {facing}
          </span>
        </div>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent/80"
        >
          Open in Google Maps <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
