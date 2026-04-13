import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminProjectForm } from "@/components/forms/admin-project-form";
import { Button } from "@/components/ui/button";

export default function AdminNewProjectPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="New project"
        description="Validation-ready form. Connect onSubmit to your API route or server action."
        actions={
          <Button variant="outline" asChild>
            <Link href="/admin/projects">Back to list</Link>
          </Button>
        }
      />
      <AdminProjectForm submitLabel="Create project" />
    </div>
  );
}
