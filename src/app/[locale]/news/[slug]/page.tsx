import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockNews } from "@/lib/mock-data";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return mockNews.flatMap((a) => [
    { locale: "mn", slug: a.slug },
    { locale: "en", slug: a.slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const article = mockNews.find((a) => a.slug === slug);
  if (!article) return {};
  return buildPageMetadata(locale, {
    title: article.title,
    description: article.excerpt,
    path: `/news/${slug}`,
    ogImageUrl: article.coverImageUrl,
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const article = mockNews.find((a) => a.slug === slug);
  if (!article) notFound();

  const date = new Intl.DateTimeFormat(locale === "mn" ? "mn-MN" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="space-y-4">
        <time className="text-xs font-semibold uppercase tracking-wide text-muted">
          {date}
        </time>
        <h1 className="font-serif-display text-4xl font-semibold tracking-tight">
          {pickLocalized(locale, article.title)}
        </h1>
        <p className="text-lg text-muted">
          {pickLocalized(locale, article.excerpt)}
        </p>
        {article.author ? (
          <p className="text-sm text-muted">
            {locale === "mn" ? "Нийтлэгч: " : "By "}
            {pickLocalized(locale, article.author)}
          </p>
        ) : null}
      </header>

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border">
        <Image
          src={article.coverImageUrl}
          alt={pickLocalized(locale, article.title)}
          fill
          priority
          className="object-cover"
          sizes="(max-width:768px) 100vw, 768px"
        />
      </div>

      <div className="mt-10 max-w-none text-sm leading-relaxed text-muted">
        <p className="whitespace-pre-line">
          {pickLocalized(locale, article.content)}
        </p>
      </div>
    </article>
  );
}
