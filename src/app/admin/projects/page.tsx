import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import { mockProjects } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminProjectsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Projects"
        description="CRUD scaffold for developments. Slugs power public detail routes."
        actions={
          <Button asChild>
            <Link href="/admin/projects/new">New project</Link>
          </Button>
        }
      />

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProjects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title.en}</TableCell>
                <TableCell className="font-mono text-xs">{p.slug}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{p.status}</Badge>
                </TableCell>
                <TableCell>{p.featured ? "Yes" : "—"}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex flex-wrap justify-end gap-2">
                    <Button size="sm" variant="secondary" asChild>
                      <Link href={`/admin/projects/${p.id}`}>Edit</Link>
                    </Button>
                    <AdminDeleteButton />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
