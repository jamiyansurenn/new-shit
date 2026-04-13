import Image from "next/image";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { mockHomeBanner } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminBannersPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Home banner"
        description="Hero headline, supporting copy, and imagery for the public homepage. Persist to your headless CMS or SQL later."
        actions={<Button type="button">Save changes</Button>}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input defaultValue={mockHomeBanner.imageUrl} readOnly />
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-border">
              <Image
                src={mockHomeBanner.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label>Headline (MN)</Label>
              <Textarea
                rows={2}
                defaultValue={mockHomeBanner.headline.mn}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label>Headline (EN)</Label>
              <Textarea
                rows={2}
                defaultValue={mockHomeBanner.headline.en}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label>Subline (MN)</Label>
              <Textarea rows={3} defaultValue={mockHomeBanner.subline.mn} />
            </div>
            <div className="space-y-2">
              <Label>Subline (EN)</Label>
              <Textarea rows={3} defaultValue={mockHomeBanner.subline.en} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
