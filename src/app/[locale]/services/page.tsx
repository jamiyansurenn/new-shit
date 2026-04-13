import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockServices } from "@/lib/mock-data";
import { SectionHeading } from "@/components/layout/section-heading";
import { ServiceCard } from "@/components/cards/service-card";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return buildPageMetadata(locale, {
    title: { mn: "Үйлчилгээ", en: "Services" },
    description: {
      mn: "Барилга барих, орон сууцны хотхон, дэд бүтэц, засвар үйлчилгээ.",
      en: "Construction, residential development, infrastructure, and refurbishment.",
    },
    path: "/services",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const sorted = [...mockServices].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        align="center"
        eyebrow={locale === "mn" ? "Бид юу хийдэг вэ" : "What we do"}
        title={locale === "mn" ? "Үйлчилгээний чиглэлүүд" : "Our services"}
        description={
          locale === "mn"
            ? "Төслийн бүх үе шатанд мэргэжлийн дэмжлэг үзүүлнэ."
            : "Professional support across the full project lifecycle."
        }
        className="mx-auto"
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {sorted.map((s) => (
          <ServiceCard key={s.id} service={s} locale={locale} />
        ))}
      </div>
    </div>
  );
}
