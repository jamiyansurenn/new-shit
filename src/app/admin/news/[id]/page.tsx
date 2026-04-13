import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminNewsForm } from "@/components/forms/admin-news-form";
import { mockNews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { params: Promise<{ id: string }> };

export default async function AdminNewsDetailPage({ params }: Props) {
  const { id } = await params;
  const article = mockNews.find((a) => a.id === id);
  if (!article) notFound();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={article.title.en}
        description={`Article ID ${article.id}`}
        actions={
          <Button variant="outline" asChild>
            <Link href="/admin/news">Back</Link>
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <AdminNewsForm
          initial={{
            slug: article.slug,
            titleMn: article.title.mn,
            titleEn: article.title.en,
            publishedAt: article.publishedAt,
          }}
        />
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="space-y-2">
            <Label>Excerpt (EN)</Label>
            <Textarea rows={3} defaultValue={article.excerpt.en} />
          </div>
          <div className="space-y-2">
            <Label>Body (EN)</Label>
            <Textarea rows={12} defaultValue={article.content.en} />
          </div>
        </div>
      </div>
    </div>
  );
}
