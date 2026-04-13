import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { mockSEO } from "./mock-data";
import type { PageSEOInput } from "@/types/seo";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://esgelen-barilga.example.mn";

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${p}`;
}

export function buildPageMetadata(
  locale: Locale,
  input: PageSEOInput,
): Metadata {
  const title = `${input.title[locale]} | ${mockSEO.siteName[locale]}`;
  const description = input.description[locale];
  const url = absoluteUrl(`/${locale}${input.path}`);
  const og = input.ogImageUrl || mockSEO.ogImageUrl;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        mn: absoluteUrl(`/mn${input.path}`),
        en: absoluteUrl(`/en${input.path}`),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: mockSEO.siteName[locale],
      locale: locale === "mn" ? "mn_MN" : "en_US",
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
  };
}

export function jsonLdOrganization(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: mockSEO.siteName[locale],
    url: absoluteUrl(`/${locale}`),
    logo: mockSEO.ogImageUrl,
  };
}
