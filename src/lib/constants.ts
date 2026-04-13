import type { Locale } from "./i18n";

export const siteShortName = "Эсгэлэн Барилга";

export type PublicNavKey =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "news"
  | "gallery"
  | "contact";

export const publicNav: {
  key: PublicNavKey;
  href: (locale: Locale) => string;
  label: Record<Locale, string>;
}[] = [
  {
    key: "home",
    href: (l) => `/${l}`,
    label: { mn: "Нүүр", en: "Home" },
  },
  {
    key: "about",
    href: (l) => `/${l}/about`,
    label: { mn: "Бидний тухай", en: "About" },
  },
  {
    key: "services",
    href: (l) => `/${l}/services`,
    label: { mn: "Үйлчилгээ", en: "Services" },
  },
  {
    key: "projects",
    href: (l) => `/${l}/projects`,
    label: { mn: "Төслүүд", en: "Projects" },
  },
  {
    key: "news",
    href: (l) => `/${l}/news`,
    label: { mn: "Мэдээ", en: "News" },
  },
  {
    key: "gallery",
    href: (l) => `/${l}/gallery`,
    label: { mn: "Зургийн цомог", en: "Gallery" },
  },
  {
    key: "contact",
    href: (l) => `/${l}/contact`,
    label: { mn: "Холбоо барих", en: "Contact" },
  },
];

export const projectStatusLabel: Record<
  string,
  Record<Locale, string>
> = {
  planning: { mn: "Төлөвлөлт", en: "Planning" },
  construction: { mn: "Барилгажилт", en: "Construction" },
  completed: { mn: "Ашиглалтад орсон", en: "Completed" },
  sales: { mn: "Борлуулалт", en: "Sales" },
};

export const galleryCategoryLabel: Record<
  string,
  Record<Locale, string>
> = {
  exterior: { mn: "Гадна талбай", en: "Exterior" },
  interior: { mn: "Дотоод засал", en: "Interior" },
  construction: { mn: "Барилгын явц", en: "Construction" },
  landscape: { mn: "Газар шинжилгээ, ландшафт", en: "Landscape" },
};
