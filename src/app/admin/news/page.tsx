import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import { mockNews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminNewsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="News"
        description="Editorial content with slug-based public URLs."
        actions={
          <Button asChild>
            <Link href="/admin/news/new">New article</Link>
          </Button>
        }
      />

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNews.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.title.en}</TableCell>
                <TableCell className="font-mono text-xs">{a.slug}</TableCell>
                <TableCell className="text-muted">{a.publishedAt}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex flex-wrap justify-end gap-2">
                    <Button size="sm" variant="secondary" asChild>
                      <Link href={`/admin/news/${a.id}`}>Edit</Link>
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
