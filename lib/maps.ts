/**
 * Shared Google Maps embed helpers. If NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is
 * set, the official Maps Embed API is used; otherwise the keyless
 * google.com/maps embeds are used so maps work out of the box.
 */

export type MapView = "satellite" | "map" | "street";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

export function mapEmbedSrc(
  view: MapView,
  lat: number,
  lng: number,
  heading = 0,
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
  if (view === "street") {
    return `https://maps.google.com/maps?q=&layer=c&cbll=${ll}&cbp=11,${heading},0,0,0&output=svembed`;
  }
  const t = view === "satellite" ? "h" : "m"; // h = hybrid, m = roadmap
  const z = view === "satellite" ? 18 : 16;
  return `https://maps.google.com/maps?q=${ll}&t=${t}&z=${z}&hl=en&output=embed`;
}

export function googleMapsLink(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function googleDirectionsLink(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
