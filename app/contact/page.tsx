import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Private Viewings",
  description: `Get in touch with ${siteConfig.name} to arrange a private viewing, request a valuation, or speak with a luxury real estate advisor.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: "Arrange a private viewing or request a confidential valuation.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const { contact } = siteConfig;

  const details = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Office",
      value: `${contact.address.street}, ${contact.address.city}, ${contact.address.region} ${contact.address.postalCode}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon–Sat, 9:00am – 7:00pm",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Whether you&apos;re buying, selling, or simply exploring, our advisors
            are here to help — discreetly and on your schedule.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-semibold">
              Contact details
            </h2>
            <ul className="mt-6 space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <d.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block text-foreground transition-colors hover:text-accent"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-foreground">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
