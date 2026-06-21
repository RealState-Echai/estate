import type { Metadata } from "next";
import { Radio, CalendarClock, History, ShieldCheck, FileText, Gavel } from "lucide-react";
import { AuctionCard } from "@/components/auction-card";
import { JsonLd } from "@/components/json-ld";
import { groupAuctions, getAuctions } from "@/lib/auctions";
import { breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Property Auctions — Live, Upcoming & Past",
  description:
    "Bank and SARFAESI e-auctions of land, commercial, and industrial property across Tamil Nadu. View reserve price, EMD, auction date, and location on the map.",
  alternates: { canonical: "/auctions" },
  openGraph: {
    title: "Property Auctions — Live, Upcoming & Past",
    description:
      "Bank and SARFAESI e-auctions of land and commercial property. Reserve price, EMD, date, and map location for each lot.",
    url: "/auctions",
  },
};

const steps = [
  {
    icon: FileText,
    title: "Register & KYC",
    body: "Complete registration and KYC on the e-auction portal for the lot you want.",
  },
  {
    icon: ShieldCheck,
    title: "Pay EMD",
    body: "Deposit the Earnest Money Deposit before the cut-off date to be eligible to bid.",
  },
  {
    icon: Gavel,
    title: "Bid & win",
    body: "Place bids during the live window. Highest bid above reserve wins the asset.",
  },
];

export default function AuctionsPage() {
  const { live, upcoming, past } = groupAuctions();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Auctions", path: "/auctions" },
        ])}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="eyebrow text-accent">Bank & SARFAESI e-auctions</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
            Property auctions across Tamil Nadu
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            Transparent reserve prices and EMD, exact auction dates, and the
            precise location of every lot on the map — so you can evaluate and
            bid with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <span className="inline-flex items-center gap-2">
              <Radio className="size-4 text-accent" /> {live.length} live
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarClock className="size-4 text-accent" /> {upcoming.length}{" "}
              upcoming
            </span>
            <span className="inline-flex items-center gap-2">
              <History className="size-4 text-accent" /> {past.length} past
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Live */}
        {live.length > 0 && (
          <section className="scroll-mt-24" id="live">
            <div className="flex items-center gap-2">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500/70" />
                <span className="relative inline-flex size-3 rounded-full bg-red-600" />
              </span>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Live now
              </h2>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {live.map((a) => (
                <AuctionCard key={a.slug} auction={a} status="live" />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming */}
        <section className="mt-14 scroll-mt-24" id="upcoming">
          <div className="flex items-center gap-2">
            <CalendarClock className="size-6 text-accent" aria-hidden />
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Upcoming auctions
            </h2>
          </div>
          {upcoming.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((a) => (
                <AuctionCard key={a.slug} auction={a} status="upcoming" />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-muted-foreground">
              No upcoming auctions are scheduled right now. Please check back
              soon.
            </p>
          )}
        </section>

        {/* How it works */}
        <section className="mt-16 rounded-lg border border-border bg-muted/40 p-8">
          <h2 className="font-display text-2xl font-semibold">
            How the auction works
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past */}
        {past.length > 0 && (
          <section className="mt-14 scroll-mt-24" id="past">
            <div className="flex items-center gap-2">
              <History className="size-6 text-accent" aria-hidden />
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Past auctions
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Recently concluded lots and their outcomes.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((a) => (
                <AuctionCard key={a.slug} auction={a} status="completed" />
              ))}
            </div>
          </section>
        )}

        <p className="mt-12 text-xs text-muted-foreground">
          Auction details are indicative and subject to the official auction
          notice issued by the respective authority. Contact {siteConfig.name}{" "}
          to verify terms before participating. {getAuctions().length} lots
          listed.
        </p>
      </div>
    </>
  );
}
