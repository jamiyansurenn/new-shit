import Link from "next/link";
import {
  Blocks,
  HardHat,
  Landmark,
  ShieldCheck,
  Timer,
  Users,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import {
  mockCompanyProfile,
  mockNews,
  mockPartners,
  mockProjects,
  mockServices,
  mockStats,
  mockTestimonials,
  mockWhyChooseUs,
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
  const iconMap = {
    ShieldCheck,
    Users,
    HardHat,
    Timer,
    Blocks,
    Landmark,
  };

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
            <Card key={s.label.en} className="border-border/80 text-center">
              <CardContent className="space-y-2 p-8">
                <p className="font-serif-display text-3xl font-semibold text-accent">
                  {pickLocalized(locale, s.value)}
                </p>
                <p className="text-sm text-muted">{s.label[locale]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow={locale === "mn" ? "Яагаад бид" : "Why choose us"}
          title={
            locale === "mn"
              ? "Итгэл төрүүлэх гүйцэтгэл, хэмжигдэхүйц үр дүн"
              : "Dependable execution with measurable outcomes"
          }
          description={
            locale === "mn"
              ? "Төслийн эрсдэлийг бууруулж, хөрөнгө оруулалтын үнэ цэнийг өсгөх менежментийн аргачлал."
              : "Delivery discipline that lowers execution risk and protects investment value."
          }
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockWhyChooseUs.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ShieldCheck;
            return (
              <Card key={item.title.en} className="h-full border-border/80">
                <CardContent className="space-y-3 p-6">
                  <span className="inline-flex rounded-md bg-accent/10 p-2 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-semibold">{pickLocalized(locale, item.title)}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {pickLocalized(locale, item.description)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {locale === "mn" ? "Хамтрагч байгууллагууд" : "Selected partners"}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {mockPartners.map((partner) => (
              <div
                key={partner}
                className="rounded-md border border-border bg-background px-3 py-4 text-center text-xs font-medium text-muted"
              >
                {partner}
              </div>
            ))}
          </div>
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

      <section className="border-y border-border bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={locale === "mn" ? "Харилцагчийн үнэлгээ" : "Client confidence"}
            title={
              locale === "mn"
                ? "Манай ажлын чанарыг үйлчлүүлэгчид ингэж үнэлдэг"
                : "How clients describe working with our team"
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="space-y-4 p-6">
                  <p className="text-sm leading-relaxed text-muted">
                    “{pickLocalized(locale, testimonial.quote)}”
                  </p>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted">
                      {pickLocalized(locale, testimonial.role)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent py-16 text-accent-foreground lg:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-3">
            <h2 className="font-serif-display text-3xl font-semibold">
              {locale === "mn"
                ? "Төслийн мэдээлэл, үнийн санал авахад бэлэн үү?"
                : "Ready for project details and a commercial proposal?"}
            </h2>
            <p className="text-sm leading-relaxed text-accent-foreground/85">
              {locale === "mn"
                ? "Бид 1 ажлын өдрийн дотор холбогдож, талбай, төсөв, хугацаанд нийцсэн гүйцэтгэлийн хувилбар санал болгоно."
                : "Our team responds within one business day with options aligned to your scope, budget, and delivery timeline."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href={`/${locale}/contact`}>
                {locale === "mn" ? "Төслийн мэдээлэл хүсэх" : "Request project info"}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background/50 text-background hover:bg-background/10"
            >
              <Link href={`/${locale}/projects`}>
                {locale === "mn" ? "Борлуулалтын төслүүд" : "View sales projects"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
