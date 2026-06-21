import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig, whatsappLink } from "@/lib/site";

/**
 * Persistent call + WhatsApp buttons, fixed to the bottom-right on every page.
 */
export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      <a
        href={whatsappLink(
          `Hi ${siteConfig.name}, I'd like to know more about your properties.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <a
        href={`tel:${siteConfig.contact.phone}`}
        aria-label={`Call ${siteConfig.name}`}
        className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
