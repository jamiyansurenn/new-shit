import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { mockHeroTrustBadges } from "@/lib/mock-data";
import type { HomeBanner } from "@/types";
import { Button } from "@/components/ui/button";

interface HomeHeroProps {
  locale: Locale;
  banner: HomeBanner;
}

export function HomeHero({ locale, banner }: HomeHeroProps) {
  const primaryHref = `/${locale}${banner.primaryCta.href}`;
  const secondaryHref = banner.secondaryCta
    ? `/${locale}${banner.secondaryCta.href}`
    : null;
  const brochureHref = `/${locale}/projects`;

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-foreground text-background sm:min-h-[640px]">
      <Image
        src={banner.imageUrl}
        alt={
          locale === "mn"
            ? "Хотын төвийн орон сууц, үйлчилгээний цогцолбор"
            : "Modern mixed-use real estate project in Ulaanbaatar"
        }
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />
      <div className="relative mx-auto flex max-w-6xl flex-col justify-end gap-8 px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl space-y-5 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-background/80">
            {locale === "mn"
              ? "Барилга · Үл хөдлөх хөрөнгө"
              : "Construction · Real Estate"}
          </p>
          <h1 className="font-serif-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {pickLocalized(locale, banner.headline)}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-background/85 animation-delay-100 animate-fade-up sm:text-lg">
            {pickLocalized(locale, banner.subline)}
          </p>
          <div className="flex flex-wrap gap-2.5 animation-delay-200 animate-fade-up sm:gap-3">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href={primaryHref}>
                {pickLocalized(locale, banner.primaryCta.label)}
              </Link>
            </Button>
            {secondaryHref && banner.secondaryCta ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/50 bg-transparent text-background hover:bg-background/10"
              >
                <Link href={secondaryHref}>
                  {pickLocalized(locale, banner.secondaryCta.label)}
                </Link>
              </Button>
            ) : null}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/40 bg-transparent text-background hover:bg-background/10"
            >
              <Link href={brochureHref}>
                {locale === "mn" ? "Танилцуулга татах" : "Download brochure"}
              </Link>
            </Button>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {mockHeroTrustBadges.map((badge) => (
            <li
              key={badge.label.en}
              className="rounded-lg border border-background/20 bg-background/10 px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-serif-display text-2xl font-semibold text-background">
                {pickLocalized(locale, badge.value)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-background/80">
                {pickLocalized(locale, badge.label)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
