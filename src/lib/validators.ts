import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Хэт богино").max(120),
  phone: z
    .string()
    .min(8, "Утасны дугаар зөв оруулна уу")
    .max(32),
  email: z.string().email("И-мэйл хаяг зөв биш байна"),
  message: z.string().min(10, "Дэлгэрэнгүй бичнэ үү").max(4000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const adminProjectDraftSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug: латин жижиг үсэг, тоо, зураас"),
  titleMn: z.string().min(2),
  titleEn: z.string().min(2),
  status: z.enum(["planning", "construction", "completed", "sales"]),
  featured: z.boolean(),
});

export type AdminProjectDraftValues = z.infer<typeof adminProjectDraftSchema>;

export const adminNewsDraftSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  titleMn: z.string().min(2),
  titleEn: z.string().min(2),
  publishedAt: z.string().min(4),
});

export type AdminNewsDraftValues = z.infer<typeof adminNewsDraftSchema>;
