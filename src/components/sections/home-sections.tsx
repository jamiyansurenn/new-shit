import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import {
  mockCompanyProfile,
  mockNews,
  mockProjects,
  mockServices,
  mockStats,
} from "@/lib/mock-data";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NewsCard } from "@/components/cards/news-card";
import { ProjectCard } from "@/components/cards/project-card";
import { ServiceCard } from "@/components/cards/service-card";

interface HomeSectionsProps {
  locale: Locale;
}

export function HomeSections({ locale }: HomeSectionsProps) {
  const featured = mockProjects.filter((p) => p.featured).slice(0, 2);
  const services = [...mockServices].sort((a, b) => a.order - b.order).slice(0, 4);
  const news = mockNews.slice(0, 2);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeading
            eyebrow={locale === "mn" ? "Бидний тухай" : "About us"}
            title={pickLocalized(locale, mockCompanyProfile.tagline)}
            description={pickLocalized(locale, mockCompanyProfile.introduction)}
          />
          <Card className="border-border/80">
            <CardContent className="space-y-4 p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {locale === "mn" ? "Алсын хараа" : "Vision"}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  {pickLocalized(locale, mockCompanyProfile.vision)}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {locale === "mn" ? "Эрхэм зорилго" : "Mission"}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  {pickLocalized(locale, mockCompanyProfile.mission)}
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link href={`/${locale}/about`}>
                  {locale === "mn" ? "Дэлгэрэнгүй" : "Learn more"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={locale === "mn" ? "Төслүүд" : "Projects"}
              title={
                locale === "mn"
                  ? "Онцлох барилга, хотхонууд"
                  : "Featured developments"
              }
              description={
                locale === "mn"
                  ? "Зах зээлд нэвтэрсэн, итгэл даасан төслүүдээс сонгож үзнэ үү."
                  : "A selection of active and landmark schemes across Mongolia."
              }
            />
            <Button asChild variant="outline">
              <Link href={`/${locale}/projects`}>
                {locale === "mn" ? "Бүх төсөл" : "All projects"}
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow={locale === "mn" ? "Үйлчилгээ" : "Services"}
          title={
            locale === "mn"
              ? "Төслийн бүх үе шатыг нэг дор"
              : "End-to-end delivery"
          }
          description={
            locale === "mn"
              ? "Төлөвлөлтөөс ашиглалт хүртэлх үйлчилгээг мэргэжлийн багаар удирдана."
              : "Professional teams steering planning, construction, and handover."
          }
          className="mx-auto"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} locale={locale} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="secondary">
            <Link href={`/${locale}/services`}>
              {locale === "mn" ? "Үйлчилгээний жагсаалт" : "Full service list"}
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {mockStats.map((s) => (
            <Card key={s.value} className="border-border/80 text-center">
              <CardContent className="space-y-2 p-8">
                <p className="font-serif-display text-3xl font-semibold text-accent">
                  {s.value}
                </p>
                <p className="text-sm text-muted">{s.label[locale]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={locale === "mn" ? "Мэдээ" : "News"}
            title={locale === "mn" ? "Сүүлийн мэдээлэл" : "Latest updates"}
          />
          <Button asChild variant="outline">
            <Link href={`/${locale}/news`}>
              {locale === "mn" ? "Бүх мэдээ" : "All news"}
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {news.map((a) => (
            <NewsCard key={a.id} article={a} locale={locale} />
          ))}
        </div>
      </section>

      <section className="bg-accent py-16 text-accent-foreground lg:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-3">
            <h2 className="font-serif-display text-3xl font-semibold">
              {locale === "mn"
                ? "Төслийн зөвлөгөө авах уу?"
                : "Discuss your next project"}
            </h2>
            <p className="text-sm leading-relaxed text-accent-foreground/85">
              {locale === "mn"
                ? "Манай мэргэжилтнүүд таны хугацаа, төсөв, техникийн нөхцөлд нийцсэн шийдлийг санал болгоно."
                : "Our specialists will align scope, budget, and programme with your objectives."}
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href={`/${locale}/contact`}>
              {locale === "mn" ? "Холбоо барих" : "Contact us"}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
