import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { mockContactInfo } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminContactPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contact information"
        description="Public-facing address block and map embed. Keep in sync with Google Business Profile."
        actions={<Button type="button">Save</Button>}
      />

      <Card>
        <CardContent className="grid gap-6 p-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={mockContactInfo.phone} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={mockContactInfo.email} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Address (MN)</Label>
            <Textarea rows={2} defaultValue={mockContactInfo.address.mn} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Address (EN)</Label>
            <Textarea rows={2} defaultValue={mockContactInfo.address.en} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Map embed URL</Label>
            <Input defaultValue={mockContactInfo.mapEmbedUrl ?? ""} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Business hours (EN)</Label>
            <Input defaultValue={mockContactInfo.businessHours?.en ?? ""} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
