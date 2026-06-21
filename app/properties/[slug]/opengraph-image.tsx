import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import {
  getAllPropertySlugs,
  getPropertyBySlug,
  statusLabels,
  typeLabels,
} from "@/lib/properties";
import { formatNumber, formatPrice } from "@/lib/utils";

export const alt = "Property listing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Pre-render one OG image per property at build time (required for export).
export function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  const title = property?.title ?? siteConfig.name;
  const location = property
    ? `${property.address.city}, ${property.address.region}`
    : "";
  const price = property
    ? property.status === "for-rent"
      ? `${formatPrice(property.price)}/mo`
      : formatPrice(property.price)
    : "";
  const meta = property
    ? `${property.bedrooms} bd · ${property.bathrooms} ba · ${formatNumber(property.area)} sqft`
    : "";
  const heroImage = property?.images[0]?.url;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#16140f",
          color: "#faf8f5",
          fontFamily: "serif",
        }}
      >
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(22,20,15,0.95) 0%, rgba(22,20,15,0.55) 50%, rgba(22,20,15,0.35) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "70px",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            {property && (
              <>
                <span
                  style={{
                    backgroundColor: "#b8893b",
                    color: "#fff",
                    fontSize: 22,
                    padding: "8px 20px",
                    borderRadius: 999,
                  }}
                >
                  {statusLabels[property.status]}
                </span>
                <span
                  style={{
                    border: "1px solid rgba(250,248,245,0.4)",
                    fontSize: 22,
                    padding: "8px 20px",
                    borderRadius: 999,
                  }}
                >
                  {typeLabels[property.type]}
                </span>
              </>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 30, color: "#b8893b", fontWeight: 600 }}>
              {price}
            </div>
            <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05 }}>
              {title}
            </div>
            <div style={{ fontSize: 28, color: "rgba(250,248,245,0.85)" }}>
              {`${location}${meta ? `  ·  ${meta}` : ""}`}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
