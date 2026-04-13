import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { mockContactSubmissions } from "@/lib/mock-data";
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

export default function AdminSubmissionsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contact submissions"
        description="Inbound enquiries from the public contact form. Mark-as-read flows belong in your API layer."
      />

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContactSubmissions.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div>{s.email}</div>
                    <div className="text-muted">{s.phone}</div>
                  </div>
                </TableCell>
                <TableCell className="max-w-md text-sm text-muted">
                  {s.message}
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs text-muted">
                  {new Date(s.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex flex-col items-end gap-2">
                    <Badge variant={s.read ? "secondary" : "default"}>
                      {s.read ? "Read" : "New"}
                    </Badge>
                    <Button size="sm" variant="outline" type="button">
                      Toggle read
                    </Button>
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
