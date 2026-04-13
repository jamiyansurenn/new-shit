import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockContactInfo } from "@/lib/mock-data";
import { SectionHeading } from "@/components/layout/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return buildPageMetadata(locale, {
    title: { mn: "Холбоо барих", en: "Contact" },
    description: {
      mn: "Хаяг, утас, и-мэйлээр холбогдож, зөвлөгөө аваарай.",
      en: "Reach our team by phone, email, or the form below.",
    },
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow={locale === "mn" ? "Холбоо" : "Contact"}
        title={locale === "mn" ? "Холбоо барих" : "Get in touch"}
        description={
          locale === "mn"
            ? "Төслийн зөвлөгөө, хамтын ажиллагааны санал хүлээн авна."
            : "We welcome project enquiries and partnership discussions."
        }
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {locale === "mn" ? "Хаяг" : "Address"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">
                    {pickLocalized(locale, mockContactInfo.address)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {locale === "mn" ? "Утас" : "Phone"}
                  </p>
                  <a
                    href={`tel:${mockContactInfo.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-sm font-medium hover:underline"
                  >
                    {mockContactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {locale === "mn" ? "И-мэйл" : "Email"}
                  </p>
                  <a
                    href={`mailto:${mockContactInfo.email}`}
                    className="mt-1 block text-sm font-medium hover:underline"
                  >
                    {mockContactInfo.email}
                  </a>
                </div>
              </div>
              {mockContactInfo.businessHours ? (
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {locale === "mn" ? "Цагийн хуваарь" : "Hours"}
                    </p>
                    <p className="mt-1 text-sm">
                      {pickLocalized(locale, mockContactInfo.businessHours)}
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
            <div className="aspect-[16/10] w-full bg-border">
              {mockContactInfo.mapEmbedUrl ? (
                <iframe
                  title={
                    locale === "mn"
                      ? "Байршлын газрын зураг"
                      : "Office location map"
                  }
                  src={mockContactInfo.mapEmbedUrl}
                  className="h-full w-full border-0 grayscale-[30%]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted">
                  {locale === "mn"
                    ? "Газрын зургийн embed URL-ийг тохируулна уу."
                    : "Configure mapEmbedUrl in your CMS or env-backed data layer."}
                </div>
              )}
            </div>
          </div>
        </div>

        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
