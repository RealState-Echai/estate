"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PropertyCard } from "@/components/property-card";
import {
  type Property,
  type PropertyStatus,
  type PropertyType,
  statusLabels,
  typeLabels,
  getAllCities,
} from "@/lib/properties";

type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "area-desc"
  | "yield-desc";

export function PropertyExplorer({
  properties,
}: {
  properties: Property[];
}) {
  // Initial state is seeded from the URL (?q=&type=) so deep links and the
  // home-page search/category links land pre-filtered. Read client-side
  // because static-exported pages have no build-time search params.
  const params = useSearchParams();
  const initialType = params.get("type") ?? "all";

  const cities = getAllCities();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [type, setType] = useState<PropertyType | "all">(
    (Object.keys(typeLabels).includes(initialType)
      ? initialType
      : "all") as PropertyType | "all",
  );
  const [city, setCity] = useState<string>(params.get("city") ?? "all");
  const [status, setStatus] = useState<PropertyStatus | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = properties.filter((p) => {
      const matchesType = type === "all" || p.type === type;
      const matchesCity = city === "all" || p.address.city === city;
      const matchesStatus = status === "all" || p.status === status;
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.address.city.toLowerCase().includes(q) ||
        p.address.region.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchesType && matchesCity && matchesStatus && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "area-desc":
          return b.area - a.area;
        case "yield-desc":
          return (b.rentalYield ?? 0) - (a.rentalYield ?? 0);
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
    return list;
  }, [properties, query, type, city, status, sort]);

  return (
    <div>
      <form
        className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-4">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <label htmlFor="property-search" className="sr-only">
              Search properties by name or location
            </label>
            <Input
              id="property-search"
              type="search"
              placeholder="Search by name or city…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="filter-type" className="sr-only">
              Property type
            </label>
            <Select
              id="filter-type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as PropertyType | "all")
              }
            >
              <option value="all">All types</option>
              {Object.entries(typeLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="filter-city" className="sr-only">
              Location
            </label>
            <Select
              id="filter-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="all">All locations</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="filter-status" className="sr-only">
              Availability
            </label>
            <Select
              id="filter-status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as PropertyStatus | "all")
              }
            >
              <option value="all">Any status</option>
              {Object.entries(statusLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="filter-sort" className="sr-only">
              Sort order
            </label>
            <div className="relative">
              <SlidersHorizontal
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Select
                id="filter-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="pl-9"
              >
                <option value="featured">Featured first</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="area-desc">Largest first</option>
                <option value="yield-desc">Highest yield</option>
              </Select>
            </div>
          </div>
        </div>
      </form>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing <span className="font-semibold text-foreground">{results.length}</span>{" "}
        {results.length === 1 ? "property" : "properties"}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((property, i) => (
            <PropertyCard
              key={property.slug}
              property={property}
              priority={i < 3}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/40 p-12 text-center">
          <p className="font-display text-lg">No properties match your search</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try widening your filters or clearing the search field.
          </p>
        </div>
      )}
    </div>
  );
}
