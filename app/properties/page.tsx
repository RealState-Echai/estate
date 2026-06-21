import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyExplorer } from "@/components/property-explorer";
import { JsonLd } from "@/components/json-ld";
import { getAllProperties } from "@/lib/properties";
import {
  breadcrumbSchema,
  listingsCollectionSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Luxury Properties for Sale & Rent",
  description:
    "Browse our full collection of luxury homes — villas, penthouses, estates, townhouses, and architectural residences. Filter by location, type, and price.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Luxury Properties for Sale & Rent",
    description:
      "Browse our full collection of luxury homes — villas, penthouses, estates, and architectural residences.",
    url: "/properties",
  },
};

export default function PropertiesPage() {
  const properties = getAllProperties();

  return (
    <>
      <JsonLd
        data={[
          listingsCollectionSchema(properties),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
          ]),
        ]}
      />

      <header className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="eyebrow">The collection</p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            Luxury properties
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A living portfolio of exceptional homes. Search, filter, and sort to
            find the residence that fits — then book a private viewing.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-lg bg-muted" />
          }
        >
          <PropertyExplorer properties={properties} />
        </Suspense>
      </div>
    </>
  );
}
