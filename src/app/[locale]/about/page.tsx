import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockCompanyProfile } from "@/lib/mock-data";
import { SectionHeading } from "@/components/layout/section-heading";
import { Card, CardContent } from "@/components/ui/card";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return buildPageMetadata(locale, {
    title: { mn: "Бидний тухай", en: "About" },
    description: {
      mn: mockCompanyProfile.introduction.mn.slice(0, 155),
      en: mockCompanyProfile.introduction.en.slice(0, 155),
    },
    path: "/about",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow={locale === "mn" ? "Компани" : "Company"}
        title={pickLocalized(locale, mockCompanyProfile.legalName)}
        description={pickLocalized(locale, mockCompanyProfile.introduction)}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-8">
            <h2 className="font-serif-display text-xl font-semibold">
              {locale === "mn" ? "Алсын хараа" : "Vision"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {pickLocalized(locale, mockCompanyProfile.vision)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-8">
            <h2 className="font-serif-display text-xl font-semibold">
              {locale === "mn" ? "Эрхэм зорилго" : "Mission"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {pickLocalized(locale, mockCompanyProfile.mission)}
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="mt-16" aria-labelledby="strengths-heading">
        <h2
          id="strengths-heading"
          className="font-serif-display text-2xl font-semibold"
        >
          {locale === "mn" ? "Давуу тал" : "Core strengths"}
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {mockCompanyProfile.strengths.map((s, i) => (
            <li key={i}>
              <Card className="h-full">
                <CardContent className="space-y-2 p-6">
                  <h3 className="font-semibold">
                    {pickLocalized(locale, s.title)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {pickLocalized(locale, s.description)}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
