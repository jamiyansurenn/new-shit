import Link from "next/link";
import { publicNav, siteShortName } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import { mockCompanyProfile, mockContactInfo } from "@/lib/mock-data";

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const rights =
    locale === "mn"
      ? "Бүх эрх хуулиар хамгаалагдсан."
      : "All rights reserved.";
  const footerDescription =
    locale === "mn"
      ? "Орон сууц, үйлчилгээний болон дэд бүтцийн төслүүдийг чанар, аюулгүй байдал, хугацааны хяналттайгаар хэрэгжүүлдэг барилгын компани."
      : "A construction and real estate company delivering residential, commercial, and infrastructure projects with strict quality and schedule control.";

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <div className="space-y-4 lg:pr-6">
          <p className="font-serif-display text-xl font-semibold">
            {siteShortName}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {footerDescription}
          </p>
          <p className="text-sm text-muted">{pickLocalized(locale, mockContactInfo.address)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {locale === "mn" ? "Холбоос" : "Links"}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {publicNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href(locale)}
                  className="text-sm text-foreground hover:text-accent"
                >
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {locale === "mn" ? "Холбоо ба эрх зүй" : "Contact & legal"}
          </p>
          <div className="space-y-2 text-sm text-muted">
            <p>{mockContactInfo.phone}</p>
            <p>{mockContactInfo.email}</p>
            <a href="#" className="block hover:text-accent">
              {locale === "mn" ? "Нууцлалын бодлого" : "Privacy policy"}
            </a>
            <a href="#" className="block hover:text-accent">
              {locale === "mn" ? "Үйлчилгээний нөхцөл" : "Terms of service"}
            </a>
            <div className="flex gap-3 pt-2">
              <a
                href={mockContactInfo.socialLinks?.facebook ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Facebook
              </a>
              <a
                href={mockContactInfo.socialLinks?.linkedin ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={mockContactInfo.socialLinks?.youtube ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {year} {pickLocalized(locale, mockCompanyProfile.legalName)}. {rights}
      </div>
    </footer>
  );
}
