import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { mockNews, mockProjects } from "@/lib/mock-data";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://esgelen-barilga.example.mn";

function u(path: string) {
  return `${base.replace(/\/$/, "")}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/projects",
    "/news",
    "/gallery",
    "/contact",
  ];

  const items: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      items.push({
        url: u(`/${locale}${p}`),
        lastModified: new Date(),
        changeFrequency: p === "" ? "weekly" : "monthly",
        priority: p === "" ? 1 : 0.7,
      });
    }
    for (const project of mockProjects) {
      items.push({
        url: u(`/${locale}/projects/${project.slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const article of mockNews) {
      items.push({
        url: u(`/${locale}/news/${article.slug}`),
        lastModified: new Date(article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return items;
}
