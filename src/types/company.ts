import type { LocalizedString } from "./i18n";

export interface HomeBanner {
  id: string;
  imageUrl: string;
  headline: LocalizedString;
  subline: LocalizedString;
  primaryCta: { label: LocalizedString; href: string };
  secondaryCta?: { label: LocalizedString; href: string };
}

export interface CompanyProfile {
  id: string;
  legalName: LocalizedString;
  tagline: LocalizedString;
  introduction: LocalizedString;
  vision: LocalizedString;
  mission: LocalizedString;
  strengths: { title: LocalizedString; description: LocalizedString }[];
  foundedYear: number;
  employeeCountApprox?: number;
  completedProjectsApprox?: number;
}
