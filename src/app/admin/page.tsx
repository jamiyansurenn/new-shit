import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { mockContactSubmissions, mockProjects, mockNews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashboardPage() {
  const unread = mockContactSubmissions.filter((s) => !s.read).length;

  return (
    <div className="space-y-10">
      <AdminPageHeader
        title="Dashboard"
        description="High-level snapshot of content and inbound enquiries. Wire these cards to your database when ready."
        actions={
          <Button asChild variant="secondary">
            <Link href="/admin/submissions">Open submissions</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Projects"
          value={String(mockProjects.length)}
          hint="Published in mock store"
        />
        <AdminStatCard
          label="News articles"
          value={String(mockNews.length)}
          hint="Replace with CMS count"
        />
        <AdminStatCard
          label="Unread messages"
          value={String(unread)}
          hint="Contact form queue"
        />
        <AdminStatCard
          label="Locales"
          value="MN / EN"
          hint="Route-ready i18n structure"
        />
      </div>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Recent submissions
        </h2>
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContactSubmissions.slice(0, 5).map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell className="text-muted">
                    {new Date(s.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{s.read ? "Read" : "New"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
