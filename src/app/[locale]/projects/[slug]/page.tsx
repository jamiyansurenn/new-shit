import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockProjects } from "@/lib/mock-data";
import { projectStatusLabel } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
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
  return buildPageMetadata(locale, {
    title: project.title,
    description: project.summary,
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

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
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
                {locale === "mn" ? "Давуу тал" : "Key features"}
              </h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted">
                {project.features.map((f, i) => (
                  <li key={i}>{pickLocalized(locale, f)}</li>
                ))}
              </ul>
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
