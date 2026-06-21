import Link from "next/link";
import { Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, mainNav } from "@/lib/site";
import { typeLabels } from "@/lib/properties";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              {siteConfig.name}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              {siteConfig.tagline} A curated portfolio of the region&apos;s most
              distinctive homes.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                className="text-primary-foreground/70 transition-colors hover:text-accent"
                aria-label="Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                className="text-primary-foreground/70 transition-colors hover:text-accent"
                aria-label="Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                className="text-primary-foreground/70 transition-colors hover:text-accent"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
              Property types
            </h2>
            <ul className="mt-4 space-y-3">
              {Object.entries(typeLabels).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/properties/?type=${key}`}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {label}s
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.region} {siteConfig.contact.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-accent" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/15 pt-8 text-sm text-primary-foreground/60 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Equal Housing Opportunity · DRE #01234567</p>
        </div>
      </div>
    </footer>
  );
}
