import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { mockProjects } from "@/lib/mock-data";
import { projectStatusLabel } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return mockProjects.flatMap((p) => [
    { locale: "mn", slug: p.slug },
    { locale: "en", slug: p.slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = pickLocalized(locale, project.title);
  return buildPageMetadata(locale, {
    title: project.title,
    description: {
      mn: `${pickLocalized(locale, project.summary)} Байршил: ${pickLocalized(locale, project.location)}.`,
      en: `${pickLocalized(locale, project.summary)} Location: ${pickLocalized(locale, project.location)}.`,
    },
    path: `/projects/${slug}`,
    ogImageUrl: project.coverImageUrl,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const status = projectStatusLabel[project.status]?.[locale] ?? project.status;
  const relatedProjects = mockProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: pickLocalized(locale, project.title),
    description: pickLocalized(locale, project.summary),
    url: absoluteUrl(`/${locale}/projects/${project.slug}`),
    image: [project.coverImageUrl, ...project.galleryUrls],
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{status}</Badge>
          {project.featured ? (
            <Badge>{locale === "mn" ? "Онцлох" : "Featured"}</Badge>
          ) : null}
        </div>
        <h1 className="font-serif-display text-4xl font-semibold tracking-tight">
          {pickLocalized(locale, project.title)}
        </h1>
        <p className="max-w-3xl text-lg text-muted">
          {pickLocalized(locale, project.summary)}
        </p>
        <p className="text-sm text-muted">
          <span className="font-medium text-foreground">
            {locale === "mn" ? "Байршил: " : "Location: "}
          </span>
          {pickLocalized(locale, project.location)}
        </p>
      </header>

      <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-lg border border-border shadow-[var(--shadow-soft)]">
        <Image
          src={project.coverImageUrl}
          alt={pickLocalized(locale, project.title)}
          fill
          priority
          className="object-cover"
          sizes="(max-width:1200px) 100vw, 1152px"
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="project-desc">
          <h2
            id="project-desc"
            className="font-serif-display text-2xl font-semibold"
          >
            {locale === "mn" ? "Тодорхойлолт" : "Overview"}
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted">
            {pickLocalized(locale, project.description)}
          </p>
          <div className="mt-8 rounded-lg border border-border bg-card p-5">
            <h3 className="font-semibold">
              {locale === "mn" ? "Төслийн давуу тал" : "Project advantages"}
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              {project.features.map((f, i) => (
                <li key={i}>{pickLocalized(locale, f)}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-1 p-5">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {locale === "mn" ? "Төслийн үе шат" : "Project phase"}
                </p>
                <p className="text-sm font-semibold">{status}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-1 p-5">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {locale === "mn" ? "Эхэлсэн огноо" : "Kickoff date"}
                </p>
                <p className="text-sm font-semibold">
                  {project.startedAt ?? (locale === "mn" ? "Тун удахгүй" : "To be announced")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-1 p-5">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {locale === "mn" ? "Хүргэлтийн төлөв" : "Delivery status"}
                </p>
                <p className="text-sm font-semibold">
                  {project.completedAt
                    ? locale === "mn"
                      ? "Ашиглалтад орсон"
                      : "Completed"
                    : locale === "mn"
                      ? "Явагдаж байна"
                      : "In progress"}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <aside className="space-y-6">
          <Card>
            <CardContent className="space-y-3 p-6">
              <h3 className="font-semibold">
                {locale === "mn" ? "Төлөвлөлт, байршил" : "Planning & layout"}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {pickLocalized(locale, project.planningNotes)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6">
              <h3 className="font-semibold">
                {locale === "mn" ? "Техникийн үзүүлэлт" : "Specification highlights"}
              </h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted">
                {(project.specifications ?? project.features).map((f, i) => (
                  <li key={i}>{pickLocalized(locale, f)}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6">
              <h3 className="font-semibold">
                {locale === "mn" ? "Борлуулалт, төлбөрийн нөхцөл" : "Sales & payment info"}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {project.paymentInfo
                  ? pickLocalized(locale, project.paymentInfo)
                  : locale === "mn"
                    ? "Төлбөрийн нөхцөл, банкны бүтээгдэхүүний мэдээллийг борлуулалтын багт хандаж авна уу."
                    : "Contact our sales advisors for current pricing and payment structures."}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href={`/${locale}/contact`}>
                    {locale === "mn" ? "Зөвлөгөө авах" : "Request consultation"}
                  </Link>
                </Button>
                {project.brochureUrl ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={project.brochureUrl} target="_blank" rel="noopener noreferrer">
                      {locale === "mn" ? "Brochure татах" : "Download brochure"}
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="mt-16" aria-labelledby="gallery-heading">
        <h2
          id="gallery-heading"
          className="font-serif-display text-2xl font-semibold"
        >
          {locale === "mn" ? "Зураг" : "Gallery"}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.galleryUrls.map((url, i) => (
            <div
              key={url}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={url}
                alt={`${pickLocalized(locale, project.title)} — ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="project-map-heading">
        <h2
          id="project-map-heading"
          className="font-serif-display text-2xl font-semibold"
        >
          {locale === "mn" ? "Байршлын зураг" : "Location map"}
        </h2>
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
          <div className="aspect-[16/8] w-full bg-border">
            {project.mapEmbedUrl ? (
              <iframe
                title={locale === "mn" ? "Төслийн байршил" : "Project location"}
                src={project.mapEmbedUrl}
                className="h-full w-full border-0 grayscale-[20%]"
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted">
                {locale === "mn"
                  ? "Газрын зургийн холбоос оруулаагүй байна."
                  : "Map embed URL has not been configured yet."}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-lg border border-border bg-accent p-8 text-accent-foreground">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-serif-display text-2xl font-semibold">
              {locale === "mn"
                ? "Төслийн дэлгэрэнгүй санал авах уу?"
                : "Need full project and pricing details?"}
            </h2>
            <p className="text-sm text-accent-foreground/85">
              {locale === "mn"
                ? "Борлуулалт, төлбөрийн нөхцөл, үлдэгдэл сонголтын мэдээллийг 1 ажлын өдрийн дотор илгээнэ."
                : "Our advisors can share unit availability, payment plans, and the latest sales package within one business day."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href={`/${locale}/contact`}>
                {locale === "mn" ? "Мэдээлэл хүсэх" : "Request project info"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/50 text-background hover:bg-background/10"
            >
              <Link href={`/${locale}/projects`}>
                {locale === "mn" ? "Бусад төсөл" : "Explore other projects"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="related-projects">
        <h2 id="related-projects" className="font-serif-display text-2xl font-semibold">
          {locale === "mn" ? "Холбоотой төслүүд" : "Related projects"}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {relatedProjects.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/projects/${item.slug}`}
              className="group rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <p className="text-xs uppercase tracking-wide text-muted">
                {projectStatusLabel[item.status]?.[locale] ?? item.status}
              </p>
              <h3 className="mt-2 font-serif-display text-xl font-semibold">
                {pickLocalized(locale, item.title)}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {pickLocalized(locale, item.summary)}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">
                {locale === "mn" ? "Төсөл рүү орох" : "Open project"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-16" />
      <footer className="text-xs text-muted">
        {project.startedAt ? (
          <p>
            {locale === "mn" ? "Эхэлсэн: " : "Started: "}
            {project.startedAt}
          </p>
        ) : null}
        {project.completedAt ? (
          <p>
            {locale === "mn" ? "Дууссан: " : "Completed: "}
            {project.completedAt}
          </p>
        ) : null}
      </footer>
    </article>
  );
}
