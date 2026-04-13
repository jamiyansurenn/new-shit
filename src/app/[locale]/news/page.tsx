import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockNews } from "@/lib/mock-data";
import { SectionHeading } from "@/components/layout/section-heading";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";

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
  const featured = sorted[0];
  const rest = sorted.slice(1);

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
      <article className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[260px]">
            <Image
              src={featured.coverImageUrl}
              alt={pickLocalized(locale, featured.title)}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 55vw"
            />
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-wide text-muted">
              {locale === "mn" ? "Онцлох мэдээ" : "Featured update"}
            </p>
            <h2 className="font-serif-display text-2xl font-semibold">
              {pickLocalized(locale, featured.title)}
            </h2>
            <p className="text-sm text-muted">{pickLocalized(locale, featured.excerpt)}</p>
            <Button asChild>
              <Link href={`/${locale}/news/${featured.slug}`}>
                {locale === "mn" ? "Дэлгэрэнгүй унших" : "Read full article"}
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {rest.map((a) => (
          <NewsCard key={a.id} article={a} locale={locale} />
        ))}
      </div>
    </div>
  );
}
