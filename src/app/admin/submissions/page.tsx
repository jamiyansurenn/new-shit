"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
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
import { Skeleton } from "@/components/ui/skeleton";
import type { ContactSubmission } from "@/types";

type ApiResponse = {
  success: boolean;
  persisted?: boolean;
  data?: ContactSubmission[];
  error?: string;
};

export default function AdminSubmissionsPage() {
  const [rows, setRows] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [persisted, setPersisted] = useState<boolean | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submissions", { cache: "no-store" });
      const json = (await res.json()) as ApiResponse;
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load submissions");
      }
      setRows(json.data || []);
      setPersisted(Boolean(json.persisted));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const subtitle = useMemo(() => {
    if (persisted === true) {
      return "Live data from database";
    }
    if (persisted === false) {
      return "Live data from local fallback storage (DB unavailable)";
    }
    return "Inbound enquiries from the public contact form.";
  }, [persisted]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Contact submissions"
        description={subtitle}
        actions={
          <Button size="sm" variant="outline" onClick={() => void load()}>
            Refresh
          </Button>
        }
      />

      {loading ? (
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : (
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
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted">
                    No submissions yet.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((s) => (
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
                      <Badge variant={s.read ? "secondary" : "default"}>
                        {s.read ? "Read" : "New"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
