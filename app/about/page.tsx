import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.name} is a boutique luxury real estate agency representing distinctive homes with discretion, expertise, and an obsessive eye for quality.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: `A boutique luxury real estate agency representing the region's most distinctive homes.`,
    url: "/about",
  },
};

const principles = [
  {
    title: "Quality over quantity",
    body: "We represent fewer homes, deliberately — so each receives the attention, staging, and storytelling it deserves.",
  },
  {
    title: "Discretion as default",
    body: "Many of our finest opportunities never reach the open market. Privacy is the standard, not the exception.",
  },
  {
    title: "Relationships, not transactions",
    body: "Most of our business comes from referrals and repeat clients. We optimise for trust over the long term.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
            A boutique agency for extraordinary homes
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            For more than two decades, {siteConfig.name} has paired exceptional
            properties with discerning buyers — quietly, expertly, and without
            compromise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
              alt="Architectural interior with natural light and minimalist styling"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold">
              Built on a simple belief
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/85">
              A home is the most personal investment a person makes. It deserves
              representation that is equal parts marketer, advisor, and advocate
              — someone who understands light, proportion, and provenance as well
              as price.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/85">
              That belief shapes everything we do: the homes we choose to
              represent, the buyers we introduce them to, and the care we bring
              to every viewing and negotiation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-border bg-card p-7"
              >
                <h3 className="font-display text-xl font-medium">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-card p-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Let&apos;s find your next home
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse the collection or speak with an advisor today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/properties"
              className={buttonVariants({ variant: "default" })}
            >
              View properties
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "accent" })}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
