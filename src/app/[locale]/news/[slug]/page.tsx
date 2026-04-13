import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { mockNews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

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
  const related = mockNews.filter((a) => a.slug !== slug).slice(0, 2);
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: pickLocalized(locale, article.title),
    datePublished: article.publishedAt,
    image: [article.coverImageUrl],
    url: absoluteUrl(`/${locale}/news/${article.slug}`),
    author: {
      "@type": "Organization",
      name: article.author
        ? pickLocalized(locale, article.author)
        : locale === "mn"
          ? "Эсгэлэн Барилгын Групп"
          : "Esgelen Construction Group",
    },
  };

  const date = new Intl.DateTimeFormat(locale === "mn" ? "mn-MN" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
        <p className="whitespace-pre-line rounded-lg border border-border bg-card p-6">
          {pickLocalized(locale, article.content)}
        </p>
      </div>
      <div className="mt-8 rounded-lg border border-border bg-accent/5 p-6">
        <p className="text-sm text-muted">
          {locale === "mn"
            ? "Барилгын явц, борлуулалтын мэдээллийг тогтмол авах бол холбоо барих хэсгээр бүртгүүлнэ үү."
            : "For regular updates on construction progress and sales releases, register through our contact page."}
        </p>
        <Button asChild className="mt-4">
          <Link href={`/${locale}/contact`}>
            {locale === "mn" ? "Мэдээлэл авах" : "Request updates"}
          </Link>
        </Button>
      </div>
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-serif-display text-2xl font-semibold">
            {locale === "mn" ? "Холбоотой мэдээ" : "Related news"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/news/${item.slug}`}
                className="rounded-lg border border-border bg-card p-4 hover:shadow-[var(--shadow-soft)]"
              >
                <p className="text-xs text-muted">{item.publishedAt}</p>
                <h3 className="mt-2 font-semibold">
                  {pickLocalized(locale, item.title)}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {pickLocalized(locale, item.excerpt)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
