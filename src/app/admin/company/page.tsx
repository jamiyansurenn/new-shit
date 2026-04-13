import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { mockCompanyProfile } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCompanyPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Company profile"
        description="Legal name, positioning, vision, mission, and strengths blocks."
        actions={<Button type="button">Save</Button>}
      />

      <Card>
        <CardContent className="grid gap-6 p-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Label>Legal name (MN)</Label>
            <Textarea rows={2} defaultValue={mockCompanyProfile.legalName.mn} />
          </div>
          <div className="space-y-2">
            <Label>Legal name (EN)</Label>
            <Textarea rows={2} defaultValue={mockCompanyProfile.legalName.en} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Introduction (MN)</Label>
            <Textarea rows={4} defaultValue={mockCompanyProfile.introduction.mn} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Introduction (EN)</Label>
            <Textarea rows={4} defaultValue={mockCompanyProfile.introduction.en} />
          </div>
          <div className="space-y-2">
            <Label>Vision (MN)</Label>
            <Textarea rows={3} defaultValue={mockCompanyProfile.vision.mn} />
          </div>
          <div className="space-y-2">
            <Label>Vision (EN)</Label>
            <Textarea rows={3} defaultValue={mockCompanyProfile.vision.en} />
          </div>
          <div className="space-y-2">
            <Label>Mission (MN)</Label>
            <Textarea rows={3} defaultValue={mockCompanyProfile.mission.mn} />
          </div>
          <div className="space-y-2">
            <Label>Mission (EN)</Label>
            <Textarea rows={3} defaultValue={mockCompanyProfile.mission.en} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
