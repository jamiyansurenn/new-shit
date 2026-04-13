import type { LocalizedString } from "./i18n";

export interface NewsArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  coverImageUrl: string;
  publishedAt: string;
  author?: LocalizedString;
}
