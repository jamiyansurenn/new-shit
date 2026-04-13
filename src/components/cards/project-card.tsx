import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { projectStatusLabel } from "@/lib/constants";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const href = `/${locale}/projects/${project.slug}`;
  const status = projectStatusLabel[project.status]?.[locale] ?? project.status;

  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={project.coverImageUrl}
            alt={pickLocalized(locale, project.title)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {status}
            </Badge>
            {project.featured ? (
              <Badge variant="default">{locale === "mn" ? "Онцлох" : "Featured"}</Badge>
            ) : null}
          </div>
        </div>
        <CardContent className="space-y-2 p-5">
          <h3 className="font-serif-display text-lg font-semibold leading-snug">
            {pickLocalized(locale, project.title)}
          </h3>
          <p className="line-clamp-2 text-sm text-muted">
            {pickLocalized(locale, project.summary)}
          </p>
          <p className="text-xs text-muted">
            {pickLocalized(locale, project.location)}
          </p>
          <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-accent">
            {locale === "mn" ? "Дэлгэрэнгүй мэдээлэл" : "View project details"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
