import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ShieldCheck, Wallet, BadgeCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { JsonLd } from "@/components/json-ld";
import { getInvestmentProperties } from "@/lib/properties";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import {
  breadcrumbSchema,
  listingsCollectionSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Investment Properties — Income & Yield",
  description:
    "Income-generating luxury properties with verified rental yields and monthly income. Compare gross yields and build a portfolio that earns.",
  alternates: { canonical: "/investment" },
  openGraph: {
    title: "Investment Properties — Income & Yield",
    description:
      "Income-generating luxury properties with verified rental yields and monthly income.",
    url: "/investment",
  },
};

const benefits = [
  {
    icon: BadgeCheck,
    title: "Verified listings",
    body: "Every income figure is documented and verified before a property is listed.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent yields",
    body: "Gross rental yields shown up front — no hidden fees, no inflated projections.",
  },
  {
    icon: Wallet,
    title: "Owner-direct deals",
    body: "Connect directly with owners on select listings to keep more of your return.",
  },
];

export default function InvestmentPage() {
  const properties = getInvestmentProperties();

  const topYield = properties.reduce(
    (max, p) => Math.max(max, p.rentalYield ?? 0),
    0,
  );
  const totalMonthly = properties.reduce(
    (sum, p) => sum + (p.monthlyIncome ?? 0),
    0,
  );

  const stats = [
    { value: `${topYield}%`, label: "Top gross yield" },
    { value: `${formatPrice(totalMonthly)}`, label: "Combined monthly income" },
    { value: `${properties.length}`, label: "Income-generating listings" },
    { value: "100%", label: "Verified figures" },
  ];

  return (
    <>
      <JsonLd
        data={[
          listingsCollectionSchema(properties),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Investment", path: "/investment" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="eyebrow text-accent">Investment collection</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
            Property that earns for you
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            A curated set of income-generating residences with verified monthly
            income and transparent gross yields — ranked highest-yield first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/properties"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Browse all properties
            </Link>
            <Link
              href="/contact"
              className={
                buttonVariants({ variant: "outline", size: "lg" }) +
                " border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              }
            >
              Speak to an advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-10 text-center">
              <p className="font-display text-3xl font-semibold text-accent sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-5 text-accent" aria-hidden />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Highest-yield opportunities
          </h2>
        </div>
        {properties.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => (
              <PropertyCard
                key={property.slug}
                property={property}
                priority={i < 3}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-muted-foreground">
            No income-generating listings are available right now. Please check
            back soon.
          </p>
        )}
      </section>

      {/* Benefits */}
      <section className="bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Why invest with {siteConfig.name}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Returns you can verify
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-lg border border-border bg-card p-7"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <b.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
