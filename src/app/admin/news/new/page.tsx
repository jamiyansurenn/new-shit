import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminNewsForm } from "@/components/forms/admin-news-form";
import { Button } from "@/components/ui/button";

export default function AdminNewNewsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="New article"
        description="Hook the resolver output into your CMS or transactional email workflow."
        actions={
          <Button variant="outline" asChild>
            <Link href="/admin/news">Back</Link>
          </Button>
        }
      />
      <AdminNewsForm />
    </div>
  );
}
