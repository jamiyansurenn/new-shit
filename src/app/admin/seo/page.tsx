import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { mockSEO } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSEOPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="SEO defaults"
        description="Site-wide Open Graph image, titles, and descriptions. Page-level metadata is composed in each route's generateMetadata."
        actions={<Button type="button">Save</Button>}
      />

      <Card>
        <CardContent className="grid gap-6 p-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Label>Site name (MN)</Label>
            <Input defaultValue={mockSEO.siteName.mn} />
          </div>
          <div className="space-y-2">
            <Label>Site name (EN)</Label>
            <Input defaultValue={mockSEO.siteName.en} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Default description (MN)</Label>
            <Textarea rows={3} defaultValue={mockSEO.defaultDescription.mn} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Default description (EN)</Label>
            <Textarea rows={3} defaultValue={mockSEO.defaultDescription.en} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Open Graph image URL</Label>
            <Input defaultValue={mockSEO.ogImageUrl} />
          </div>
          <div className="space-y-2">
            <Label>Twitter / X handle (optional)</Label>
            <Input placeholder="@esgelen" defaultValue={mockSEO.twitterHandle ?? ""} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
