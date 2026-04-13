import type { LocalizedString } from "./i18n";

export interface Service {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  iconName?: string;
  imageUrl?: string;
  order: number;
}
