"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { typeLabels } from "@/lib/properties";

type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // INTEGRATION POINT — wire to your backend/form service here, e.g.:
    //   await fetch("https://formspree.io/f/<id>", { method: "POST", body: new FormData(e.currentTarget) })
    // For this static demo we simulate a successful submission.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Check className="size-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl font-medium">Thank you</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your enquiry has been received. An advisor will be in touch within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <Input id="name" name="name" autoComplete="name" required className="mt-2" />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="interest" className="text-sm font-medium">
            I&apos;m interested in
          </label>
          <Select id="interest" name="interest" defaultValue="" className="mt-2">
            <option value="" disabled>
              Select an option
            </option>
            <option value="buying">Buying a home</option>
            <option value="selling">Selling / valuation</option>
            <option value="renting">Renting</option>
            {Object.entries(typeLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}s
              </option>
            ))}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-2 flex w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Tell us what you're looking for…"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" variant="accent" disabled={status === "submitting"}>
          {status === "submitting" && (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          )}
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs text-muted-foreground">
          We respect your privacy and never share your details.
        </p>
      </div>
    </form>
  );
}
