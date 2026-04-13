import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n";
import type { Service } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
  locale: Locale;
}

export function ServiceCard({ service, locale }: ServiceCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      {service.imageUrl ? (
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={service.imageUrl}
            alt={pickLocalized(locale, service.title)}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 400px"
          />
        </div>
      ) : null}
      <CardHeader>
        <CardTitle>{pickLocalized(locale, service.title)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted">
        <p>{pickLocalized(locale, service.shortDescription)}</p>
        <p className="leading-relaxed text-foreground/90">
          {pickLocalized(locale, service.description)}
        </p>
      </CardContent>
    </Card>
  );
}
