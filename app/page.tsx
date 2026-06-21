import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  KeyRound,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { getFeaturedProperties, typeLabels } from "@/lib/properties";
import { siteConfig } from "@/lib/site";

const stats = [
  { value: "$2.4B+", label: "In closed transactions" },
  { value: "320+", label: "Homes sold" },
  { value: "27", label: "Days average on market" },
  { value: "4.9/5", label: "Client satisfaction" },
];

const valueProps = [
  {
    icon: Sparkles,
    title: "Curated, not crowded",
    body: "Every listing is hand-selected for design, location, and provenance — never an endless feed.",
  },
  {
    icon: ShieldCheck,
    title: "Discreet representation",
    body: "Private viewings and off-market access, with absolute confidentiality at every step.",
  },
  {
    icon: KeyRound,
    title: "End-to-end concierge",
    body: "From first viewing to final signature, one dedicated advisor manages the entire journey.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProperties();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="Sunlit modern luxury living room opening onto a terrace"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/55 to-primary/35" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-40">
          <div className="max-w-2xl text-primary-foreground">
            <p className="eyebrow text-accent">{siteConfig.tagline}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Find the home that feels inevitable
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
              An exclusive collection of luxury residences, waterfront estates,
              and architectural landmarks — paired with advisors who know every
              one intimately.
            </p>

            <form
              action="/properties/"
              method="get"
              role="search"
              className="mt-9 flex flex-col gap-3 rounded-lg bg-background/95 p-3 shadow-2xl backdrop-blur sm:flex-row"
            >
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <label htmlFor="hero-search" className="sr-only">
                  Search luxury properties by city or name
                </label>
                <input
                  id="hero-search"
                  type="search"
                  name="q"
                  placeholder="Search by city, e.g. “Napa” or “Sausalito”"
                  className="h-13 w-full rounded-md border-0 bg-transparent pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
                />
              </div>
              <button
                type="submit"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Search homes
              </button>
            </form>

            <p className="mt-4 text-sm text-primary-foreground/70">
              Popular:{" "}
              {Object.entries(typeLabels)
                .slice(0, 4)
                .map(([key, label], i, arr) => (
                  <span key={key}>
                    <Link
                      href={`/properties/?type=${key}`}
                      className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {label}s
                    </Link>
                    {i < arr.length - 1 ? ", " : ""}
                  </span>
                ))}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
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

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Featured residences</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              This season&apos;s most coveted homes
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            View all properties
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property, i) => (
            <PropertyCard
              key={property.slug}
              property={property}
              priority={i < 3}
            />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Why {siteConfig.name}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              A quieter, more considered way to buy
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {valueProps.map((vp) => (
              <div
                key={vp.title}
                className="rounded-lg border border-border bg-card p-7"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <vp.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium">
                  {vp.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {vp.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Considering a private sale?
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Our advisors provide discreet valuations and off-market
              introductions for distinctive homes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Request a valuation
            </Link>
            <Link
              href="/properties"
              className={buttonVariants({ variant: "outline", size: "lg" }) +
                " border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"}
            >
              Browse listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
