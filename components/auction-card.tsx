import Link from "next/link";
import { MapPin, Gavel, CalendarClock, Maximize, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatPrice, formatAuctionWindow } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { mapEmbedSrc } from "@/lib/maps";
import {
  type Auction,
  type AuctionStatus,
  assetTypeLabels,
  statusLabels,
  outcomeLabels,
} from "@/lib/auctions";

function StatusBadge({
  status,
  auction,
}: {
  status: AuctionStatus;
  auction: Auction;
}) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80" />
          <span className="relative inline-flex size-2 rounded-full bg-white" />
        </span>
        Live now
      </span>
    );
  }
  if (status === "completed" && auction.result) {
    return (
      <Badge variant={auction.result.outcome === "sold" ? "accent" : "muted"}>
        {outcomeLabels[auction.result.outcome]}
      </Badge>
    );
  }
  return <Badge variant="default">{statusLabels[status]}</Badge>;
}

export function AuctionCard({
  auction,
  status,
}: {
  auction: Auction;
  status: AuctionStatus;
}) {
  const register = whatsappLink(
    `I'd like to register for auction ${auction.lotNo} — ${auction.borrower} (${auction.title}). Reserve price ${formatPrice(auction.reservePrice, "INR")}.`,
  );
  const dimmed = status === "completed";

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-200 hover:shadow-xl hover:shadow-black/5 ${dimmed ? "opacity-90" : ""}`}
    >
      {/* Map-forward header (images for distressed assets are often poor) */}
      <div className="relative aspect-[16/10] bg-muted">
        <iframe
          src={mapEmbedSrc("satellite", auction.geo.lat, auction.geo.lng)}
          title={`Map of ${auction.title}`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          <StatusBadge status={status} auction={auction} />
          <Badge variant="outline" className="bg-background/90">
            {assetTypeLabels[auction.assetType]}
          </Badge>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-10">
          <Badge variant="muted" className="bg-background/90">
            {auction.lotNo}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-start gap-2 font-display text-lg font-semibold">
          <Gavel className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
          {auction.borrower}
        </h3>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
          {auction.address.area}, {auction.address.city}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
          <div>
            <dt className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
              <Maximize className="size-3.5" aria-hidden /> Area
            </dt>
            <dd className="mt-0.5 font-medium">{auction.areaLabel}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
              <Wallet className="size-3.5" aria-hidden /> EMD
            </dt>
            <dd className="mt-0.5 font-medium">
              {formatPrice(auction.emd, "INR")}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              {status === "completed" && auction.result?.salePrice
                ? "Sold for"
                : "Reserve price"}
            </dt>
            <dd className="mt-0.5 font-display text-xl font-semibold text-accent">
              {formatPrice(
                status === "completed" && auction.result?.salePrice
                  ? auction.result.salePrice
                  : auction.reservePrice,
                "INR",
              )}
            </dd>
          </div>
        </dl>

        <p className="mt-3 flex items-center gap-1.5 text-sm text-foreground/80">
          <CalendarClock className="size-4 text-accent" aria-hidden />
          {formatAuctionWindow(auction.start, auction.end)}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/auctions/${auction.slug}`}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View details
          </Link>
          {status !== "completed" && (
            <a
              href={register}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Register for auction ${auction.lotNo} on WhatsApp`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="size-4" />
              Register
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
