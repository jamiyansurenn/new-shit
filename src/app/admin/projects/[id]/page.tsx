import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import { AdminProjectForm } from "@/components/forms/admin-project-form";
import { mockProjects } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { params: Promise<{ id: string }> };

export default async function AdminProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={project.title.en}
        description={`Internal ID: ${project.id} · Public slug /mn/projects/${project.slug}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/projects">Back</Link>
            </Button>
            <AdminDeleteButton label="Archive" />
          </div>
        }
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <AdminProjectForm
          submitLabel="Update core fields"
          initial={{
            slug: project.slug,
            titleMn: project.title.mn,
            titleEn: project.title.en,
            status: project.status,
            featured: project.featured,
          }}
        />
        <Card>
          <CardContent className="space-y-4 p-6">
            <p className="text-xs font-semibold uppercase text-muted">
              Rich text (stub)
            </p>
            <div className="space-y-2">
              <Label>Description (EN)</Label>
              <Textarea rows={8} defaultValue={project.description.en} />
            </div>
            <div className="space-y-2">
              <Label>Gallery URLs (one per line)</Label>
              <Textarea
                rows={4}
                defaultValue={project.galleryUrls.join("\n")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
