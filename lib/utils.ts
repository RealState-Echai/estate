import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic (shadcn convention). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const priceFormatters: Record<string, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
  // en-IN gives lakh/crore grouping, e.g. ₹45,00,000
  INR: new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }),
};

export function formatPrice(
  value: number,
  currency: "USD" | "INR" = "USD",
): string {
  return (priceFormatters[currency] ?? priceFormatters.USD).format(value);
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

// Auction dates are quoted in Indian Standard Time.
const istDate = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});
const istTime = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

export function formatDate(iso: string): string {
  return istDate.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return istTime.format(new Date(iso));
}

/** "23 Jul 2026 · 10:30 AM – 1:30 PM" */
export function formatAuctionWindow(startIso: string, endIso: string): string {
  return `${formatDate(startIso)} · ${formatTime(startIso)} – ${formatTime(endIso)}`;
}
