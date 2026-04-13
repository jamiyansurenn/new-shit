import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { mockGallery } from "@/lib/mock-data";
import { galleryCategoryLabel } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminGalleryPage() {
  const hasItems = mockGallery.length > 0;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Gallery"
        description="Category-aware media library. Swap mock rows for signed URLs from object storage."
        actions={<Button type="button">Upload image</Button>}
      />

      {hasItems ? (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Alt (EN)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...mockGallery]
                .sort((a, b) => a.order - b.order)
                .map((g) => (
                  <TableRow key={g.id}>
                    <TableCell>{g.order}</TableCell>
                    <TableCell>{galleryCategoryLabel[g.categoryId].en}</TableCell>
                    <TableCell className="max-w-xs truncate">{g.altEn}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="secondary" type="button">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <AdminEmptyState
          title="No gallery items"
          description="Seed content from the CMS or import a CSV of image metadata."
          action={<Button type="button">Create first item</Button>}
        />
      )}
    </div>
  );
}
