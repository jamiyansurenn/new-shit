"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  adminNewsDraftSchema,
  type AdminNewsDraftValues,
} from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultValues: AdminNewsDraftValues = {
  slug: "",
  titleMn: "",
  titleEn: "",
  publishedAt: "",
};

interface AdminNewsFormProps {
  initial?: Partial<AdminNewsDraftValues>;
}

export function AdminNewsForm({ initial }: AdminNewsFormProps) {
  const form = useForm<AdminNewsDraftValues>({
    resolver: zodResolver(adminNewsDraftSchema),
    defaultValues: { ...defaultValues, ...initial },
  });

  function onSubmit(data: AdminNewsDraftValues) {
    console.info("Admin news draft (wire to API):", data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-4 rounded-lg border border-border bg-card p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="nslug">Slug</Label>
        <Input id="nslug" {...form.register("slug")} />
        {form.formState.errors.slug ? (
          <p className="text-xs text-red-600">
            {form.formState.errors.slug.message}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ntitleMn">Title (MN)</Label>
          <Input id="ntitleMn" {...form.register("titleMn")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ntitleEn">Title (EN)</Label>
          <Input id="ntitleEn" {...form.register("titleEn")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="publishedAt">Published at (ISO)</Label>
        <Input id="publishedAt" {...form.register("publishedAt")} />
      </div>
      <Button type="submit">Save article</Button>
    </form>
  );
}
