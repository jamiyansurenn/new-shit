import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
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

  return (
    <section className="relative min-h-[520px] overflow-hidden bg-foreground text-background sm:min-h-[600px]">
      <Image
        src={banner.imageUrl}
        alt=""
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />
      <div className="relative mx-auto flex max-w-6xl flex-col justify-end gap-8 px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl space-y-6 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-background/80">
            {locale === "mn" ? "Барилга · Үл хөдлөх хөрөнгө" : "Construction · Real estate"}
          </p>
          <h1 className="font-serif-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {pickLocalized(locale, banner.headline)}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-background/85 animation-delay-100 animate-fade-up">
            {pickLocalized(locale, banner.subline)}
          </p>
          <div className="flex flex-wrap gap-3 animation-delay-200 animate-fade-up">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
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
          </div>
        </div>
      </div>
    </section>
  );
}
