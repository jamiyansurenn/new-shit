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

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="font-serif-display text-xl font-semibold">
            {siteShortName}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {pickLocalized(locale, mockCompanyProfile.tagline)}
          </p>
          <p className="text-sm text-muted">
            {mockContactInfo.phone} · {mockContactInfo.email}
          </p>
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
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {year} {pickLocalized(locale, mockCompanyProfile.legalName)}. {rights}
      </div>
    </footer>
  );
}
