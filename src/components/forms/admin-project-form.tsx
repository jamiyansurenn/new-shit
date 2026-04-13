"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  adminProjectDraftSchema,
  type AdminProjectDraftValues,
} from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultValues: AdminProjectDraftValues = {
  slug: "",
  titleMn: "",
  titleEn: "",
  status: "planning",
  featured: false,
};

interface AdminProjectFormProps {
  initial?: Partial<AdminProjectDraftValues>;
  submitLabel?: string;
}

export function AdminProjectForm({
  initial,
  submitLabel = "Save draft",
}: AdminProjectFormProps) {
  const form = useForm<AdminProjectDraftValues>({
    resolver: zodResolver(adminProjectDraftSchema),
    defaultValues: { ...defaultValues, ...initial },
  });

  function onSubmit(data: AdminProjectDraftValues) {
    console.info("Admin project draft (wire to API):", data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-4 rounded-lg border border-border bg-card p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...form.register("slug")} />
        {form.formState.errors.slug ? (
          <p className="text-xs text-red-600">
            {form.formState.errors.slug.message}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="titleMn">Title (MN)</Label>
          <Input id="titleMn" {...form.register("titleMn")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="titleEn">Title (EN)</Label>
          <Input id="titleEn" {...form.register("titleEn")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="flex h-10 w-full rounded-md border border-border bg-card px-3 text-sm shadow-sm"
          {...form.register("status")}
        >
          <option value="planning">Planning</option>
          <option value="construction">Construction</option>
          <option value="completed">Completed</option>
          <option value="sales">Sales</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <Controller
          name="featured"
          control={form.control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        Featured
      </label>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
