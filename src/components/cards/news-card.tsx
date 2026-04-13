import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import type { NewsArticle } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface NewsCardProps {
  article: NewsArticle;
  locale: Locale;
}

export function NewsCard({ article, locale }: NewsCardProps) {
  const href = `/${locale}/news/${article.slug}`;
  const date = new Intl.DateTimeFormat(locale === "mn" ? "mn-MN" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-lg">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={article.coverImageUrl}
            alt={pickLocalized(locale, article.title)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width:768px) 100vw, 400px"
          />
        </div>
        <CardContent className="space-y-2 p-5">
          <time className="text-xs font-medium uppercase tracking-wide text-muted">
            {date}
          </time>
          <h3 className="font-serif-display text-lg font-semibold leading-snug">
            {pickLocalized(locale, article.title)}
          </h3>
          <p className="line-clamp-3 text-sm text-muted">
            {pickLocalized(locale, article.excerpt)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
