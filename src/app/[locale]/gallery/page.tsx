import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockGallery } from "@/lib/mock-data";
import { galleryCategoryLabel } from "@/lib/constants";
import type { GalleryCategoryId } from "@/types";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
};

const categories: GalleryCategoryId[] = [
  "exterior",
  "interior",
  "construction",
  "landscape",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return buildPageMetadata(locale, {
    title: { mn: "Зургийн цомог", en: "Gallery" },
    description: {
      mn: "Барилга, дотоод засал, барилгын явцын сонгодог зургууд.",
      en: "Selected photography across exteriors, interiors, and construction progress.",
    },
    path: "/gallery",
  });
}

export default async function GalleryPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const { cat } = await searchParams;
  const filter =
    cat && categories.includes(cat as GalleryCategoryId)
      ? (cat as GalleryCategoryId)
      : "all";

  const sorted = [...mockGallery].sort((a, b) => a.order - b.order);
  const filtered =
    filter === "all"
      ? sorted
      : sorted.filter((g) => g.categoryId === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        align="center"
        eyebrow={locale === "mn" ? "Зураг" : "Imagery"}
        title={locale === "mn" ? "Зургийн цомог" : "Project gallery"}
        description={
          locale === "mn"
            ? "Ангиллаар шүүж, төслийн чанарыг ойлгомжтой харуулна."
            : "Browse by category to explore delivery quality across our schemes."
        }
        className="mx-auto"
      />

      <div
        className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2"
        role="navigation"
        aria-label={locale === "mn" ? "Ангилал" : "Categories"}
      >
        <Link href={`/${locale}/gallery`}>
          <Badge
            variant={filter === "all" ? "default" : "secondary"}
            className="cursor-pointer px-3 py-1.5"
          >
            {locale === "mn" ? "Бүгд" : "All"}
          </Badge>
        </Link>
        {categories.map((c) => (
          <Link key={c} href={`/${locale}/gallery?cat=${c}`}>
            <Badge
              variant={filter === c ? "default" : "secondary"}
              className="cursor-pointer px-3 py-1.5"
            >
              {galleryCategoryLabel[c][locale]}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center text-xs text-muted">
        {locale === "mn"
          ? `${filtered.length} зураг харуулж байна`
          : `${filtered.length} images shown`}
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((img) => {
          const alt = locale === "mn" ? img.altMn : img.altEn;
          return (
            <li
              key={img.id}
              className="group relative overflow-hidden rounded-lg border border-border shadow-[var(--shadow-soft)]"
            >
              <div
                className={
                  img.order % 5 === 0
                    ? "relative aspect-[4/5]"
                    : "relative aspect-[4/3]"
                }
              >
              <Image
                src={img.imageUrl}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 text-xs font-medium text-background">
                {galleryCategoryLabel[img.categoryId][locale]}
              </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 rounded-lg border border-border bg-card p-6 text-center">
        <h2 className="font-serif-display text-2xl font-semibold">
          {locale === "mn"
            ? "Төслийн бүрэн танилцуулга авах"
            : "Request full project presentation"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {locale === "mn"
            ? "Зураг, төлөвлөлт, үнийн мэдээлэлтэй PDF танилцуулгыг манай борлуулалтын баг илгээнэ."
            : "Our sales advisors can share full brochures with gallery, planning, and commercial details."}
        </p>
        <Button asChild className="mt-4">
          <Link href={`/${locale}/contact`}>
            {locale === "mn" ? "Мэдээлэл хүсэх" : "Request information"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
