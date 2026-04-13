import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import { mockServices } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Services"
        description="Manage service cards shown on the public site."
        actions={<Button asChild><Link href="#">Add service</Link></Button>}
      />

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Title (EN)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...mockServices]
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.order}</TableCell>
                  <TableCell className="font-mono text-xs">{s.slug}</TableCell>
                  <TableCell>{s.title.en}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={`#${s.id}`}>Edit</Link>
                      </Button>
                      <AdminDeleteButton label="" />
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
