import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockNews } from "@/lib/mock-data";
import { SectionHeading } from "@/components/layout/section-heading";
import { NewsCard } from "@/components/cards/news-card";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return buildPageMetadata(locale, {
    title: { mn: "Мэдээ", en: "News" },
    description: {
      mn: "Компанийн мэдээ, салбарын шинэчлэл, төслийн явцын тойм.",
      en: "Company updates, sector insights, and project milestones.",
    },
    path: "/news",
  });
}

export default async function NewsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const sorted = [...mockNews].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow={locale === "mn" ? "Мэдээлэл" : "Updates"}
        title={locale === "mn" ? "Мэдээ, хураангуй" : "Newsroom"}
        description={
          locale === "mn"
            ? "Төсөл, түншлэл, компанийн дотоод мэдээллүүд."
            : "Project stories, partnerships, and corporate announcements."
        }
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {sorted.map((a) => (
          <NewsCard key={a.id} article={a} locale={locale} />
        ))}
      </div>
    </div>
  );
}
