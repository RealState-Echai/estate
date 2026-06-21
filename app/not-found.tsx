import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you&apos;re looking for may have been moved, sold, or never
        existed. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Back to home
        </Link>
        <Link
          href="/properties"
          className={buttonVariants({ variant: "accent" })}
        >
          Browse properties
        </Link>
      </div>
    </section>
  );
}
