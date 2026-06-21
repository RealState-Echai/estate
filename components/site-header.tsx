"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, mainNav } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 hover:text-accent",
                    isActive(item.href)
                      ? "text-accent"
                      : "text-foreground/80",
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
          >
            <Phone className="size-4" aria-hidden />
            <span className="sr-only">Call us: </span>
            {siteConfig.contact.phone}
          </a>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "accent", size: "sm" })}
          >
            Book a viewing
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block py-3 text-base font-medium transition-colors hover:text-accent",
                    isActive(item.href) ? "text-accent" : "text-foreground",
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground"
              >
                Book a viewing
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
