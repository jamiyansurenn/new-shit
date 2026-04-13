import type { LocalizedString } from "./i18n";

export type ProjectStatus = "planning" | "construction" | "completed" | "sales";

export interface Project {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  location: LocalizedString;
  coverImageUrl: string;
  galleryUrls: string[];
  planningNotes: LocalizedString;
  features: LocalizedString[];
  status: ProjectStatus;
  featured: boolean;
  startedAt?: string;
  completedAt?: string;
}
