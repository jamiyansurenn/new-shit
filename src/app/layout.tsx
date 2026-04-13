import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { mockSEO } from "@/lib/mock-data";

const sans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
});

const serif = IBM_Plex_Serif({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://esgelen-barilga.example.mn",
  ),
  title: {
    default: mockSEO.siteName.en,
    template: `%s | ${mockSEO.siteName.en}`,
  },
  description: mockSEO.defaultDescription.en,
  openGraph: {
    images: [{ url: mockSEO.ogImageUrl }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
