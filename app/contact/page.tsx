import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import Container from "@/components/layout/Container";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about Aquai products - dealer partnerships, project specifications, or general information. Reach Core Entrade India Pvt. Ltd., authorised distributor.",
};

const PHONE = "+91 97060 41000";
const PHONE_HREF = "tel:+919706041000";
const WHATSAPP_HREF =
  "https://wa.me/919706041000?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Aquai%20products.";
const EMAIL = "coregujarat@coreindia.co.in";
const ADDRESS_LINES = [
  "Transport Nagar, Navagram",
  "Rajkot – 360003",
  "Gujarat, India",
];

export default function ContactPage() {
  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <div className="bg-mist pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <AnimateIn>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              Get in touch
            </p>
            <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-navy">
              {"We’d like to hear from you."}
            </h1>
          </AnimateIn>
        </Container>
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      <section className="bg-porcelain py-16 md:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:items-start">
            {/* Left: contact info */}
            <AnimateIn>
              <div>
                <p className="mb-8 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                  Authorised distributor
                </p>

                <h2 className="mb-2 font-body text-lg font-semibold text-navy">
                  Core Entrade India Pvt. Ltd.
                </h2>
                <address className="mb-10 not-italic text-sm leading-[1.8] text-steel">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                {/* Contact links */}
                <div className="space-y-5">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel/60">
                      Phone
                    </p>
                    <a
                      href={PHONE_HREF}
                      className="text-navy text-base font-medium hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-sm"
                    >
                      {PHONE}
                    </a>
                  </div>

                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel/60">
                      WhatsApp
                    </p>
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-navy text-base font-medium hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-sm"
                    >
                      {PHONE}
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-current opacity-60"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel/60">
                      Email
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-navy text-base font-medium hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-sm break-all"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-10 border-t border-chrome pt-8">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel/60">
                    Business hours
                  </p>
                  <p className="text-sm text-steel">
                    Monday – Saturday, 10 am – 6 pm IST
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Right: form */}
            <AnimateIn delay={0.1}>
              <h2 className="mb-8 font-display text-h2 text-navy">
                Send an enquiry.
              </h2>
              <ContactForm />
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* ── Map ──────────────────────────────────────────── */}
      <section className="bg-mist" aria-label="Office location map">
        <div className="h-[360px] md:h-[440px] w-full overflow-hidden">
          <iframe
            title="Core Entrade India Pvt. Ltd. - Transport Nagar, Rajkot"
            src="https://maps.google.com/maps?q=Transport+Nagar%2C+Navagram%2C+Rajkot%2C+Gujarat+360003%2C+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="bg-mist px-6 py-5 text-center">
          <a
            href="https://maps.google.com/?q=Transport+Nagar,+Navagram,+Rajkot,+Gujarat+360003,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-steel hover:text-navy transition-colors duration-150 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-sm"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </section>
    </>
  );
}
