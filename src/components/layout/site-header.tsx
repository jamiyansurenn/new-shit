"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { publicNav, siteShortName } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { localeNames, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SiteHeaderProps {
  locale: Locale;
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchLocale(next: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${next}`;
    segments[0] = next;
    return `/${segments.join("/")}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="font-serif-display text-lg font-semibold tracking-tight text-foreground"
        >
          {siteShortName}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {publicNav.map((item) => {
            const href = item.href(locale);
            const active =
              href === `/${locale}`
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.label[locale]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-md border border-border bg-card p-0.5 sm:flex">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchLocale(l)}
                className={cn(
                  "rounded px-2 py-1 text-xs font-medium",
                  l === locale
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:text-foreground",
                )}
                hrefLang={l}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            type="button"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile main">
            {publicNav.map((item) => (
              <Link
                key={item.key}
                href={item.href(locale)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-card"
                onClick={() => setOpen(false)}
              >
                {item.label[locale]}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-2 border-t border-border pt-4">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchLocale(l)}
                className={cn(
                  "flex-1 rounded-md border border-border py-2 text-center text-xs font-medium",
                  l === locale && "bg-accent text-accent-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
