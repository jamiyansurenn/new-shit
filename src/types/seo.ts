import type { LocalizedString } from "./i18n";

export interface SEOSettings {
  siteName: LocalizedString;
  defaultTitleSuffix: LocalizedString;
  defaultDescription: LocalizedString;
  ogImageUrl: string;
  twitterHandle?: string;
}

export interface PageSEOInput {
  title: LocalizedString;
  description: LocalizedString;
  path: string;
  ogImageUrl?: string;
}
