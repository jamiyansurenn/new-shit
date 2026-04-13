import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { mockProjects } from "@/lib/mock-data";
import { projectStatusLabel } from "@/lib/constants";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return buildPageMetadata(locale, {
    title: { mn: "Төслүүд", en: "Projects" },
    description: {
      mn: "Орон сууц, үйлчилгээний төсөл, логистикийн төв зэрэг бодитой хэрэгжүүлсэн ажлууд.",
      en: "Residential, commercial, and logistics schemes delivered across Mongolia.",
    },
    path: "/projects",
  });
}

const statuses = ["all", "planning", "construction", "completed", "sales"] as const;

export default async function ProjectsPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const { status } = await searchParams;
  const filter =
    status && statuses.includes(status as (typeof statuses)[number])
      ? status
      : "all";

  const filtered =
    filter === "all"
      ? mockProjects
      : mockProjects.filter((p) => p.status === filter);
  const featuredCount = mockProjects.filter((p) => p.featured).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow={locale === "mn" ? "Борлуулалт ба гүйцэтгэл" : "Sales & delivery"}
        title={locale === "mn" ? "Төслийн нэгдсэн сан" : "Project portfolio"}
        description={
          locale === "mn"
            ? "Төлөв, байршил, хөгжүүлэлтийн үе шатаар шүүж, хөрөнгө оруулалтын сонголтоо тодорхой болгоорой."
            : "Filter by development status and compare opportunities with clear project context."
        }
      />
      <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
        <span className="rounded-md bg-card px-2.5 py-1">
          {locale === "mn" ? `Нийт ${mockProjects.length} төсөл` : `${mockProjects.length} total projects`}
        </span>
        <span className="rounded-md bg-card px-2.5 py-1">
          {locale === "mn" ? `${featuredCount} онцлох` : `${featuredCount} featured`}
        </span>
      </div>

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="navigation"
        aria-label={locale === "mn" ? "Төлөвөөр шүүх" : "Filter by status"}
      >
        {statuses.map((s) => {
          const href =
            s === "all"
              ? `/${locale}/projects`
              : `/${locale}/projects?status=${s}`;
          const active = filter === s;
          const label =
            s === "all"
              ? locale === "mn"
                ? "Бүгд"
                : "All"
              : projectStatusLabel[s]?.[locale] ?? s;
          return (
            <Link key={s} href={href}>
              <Badge
                variant={active ? "default" : "secondary"}
                className="cursor-pointer px-3 py-1.5 text-xs"
              >
                {label}
              </Badge>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-sm text-muted">
          {locale === "mn"
            ? "Энэ шүүлтэд тохирох төсөл олдсонгүй."
            : "No projects match this filter."}
        </p>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
