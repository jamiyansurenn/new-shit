import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata, jsonLdOrganization } from "@/lib/seo";
import { mockHomeBanner } from "@/lib/mock-data";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeSections } from "@/components/sections/home-sections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return buildPageMetadata(locale, {
    title: {
      mn: "Нүүр хуудас",
      en: "Home",
    },
    description: {
      mn: "Эсгэлэн Барилгын Групп — орон сууц, үйлчилгээний төсөл, барилгын үйлчилгээ.",
      en: "Esgelen Construction Group — residential and commercial development in Mongolia.",
    },
    path: "",
    ogImageUrl: mockHomeBanner.imageUrl,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const jsonLd = jsonLdOrganization(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero locale={locale} banner={mockHomeBanner} />
      <HomeSections locale={locale} />
    </>
  );
}
