"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { contactFormSchema, type ContactFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const copy: Record<
  Locale,
  {
    title: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    errors: Record<string, string>;
  }
> = {
  mn: {
    title: "Зурвас илгээх",
    name: "Овог нэр",
    phone: "Утас",
    email: "И-мэйл",
    message: "Зурвас",
    submit: "Илгээх",
    success: "Амжилттай илгээгдлээ. Бид удахгүй холбогдоно.",
    errors: {},
  },
  en: {
    title: "Send a message",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    message: "Message",
    submit: "Submit",
    success: "Thank you. Our team will respond shortly.",
    errors: {},
  },
};

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = copy[locale];
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(_data: ContactFormValues) {
    setSubmitted(true);
    form.reset();
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <h2 className="font-serif-display text-xl font-semibold">{t.title}</h2>
      {submitted ? (
        <p className="mt-4 text-sm text-muted" role="status">
          {t.success}
        </p>
      ) : (
        <form
          className="mt-6 space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="name">{t.name}</Label>
            <Input id="name" autoComplete="name" {...form.register("name")} />
            {form.formState.errors.name ? (
              <p className="text-xs text-red-600">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...form.register("phone")}
              />
              {form.formState.errors.phone ? (
                <p className="text-xs text-red-600">
                  {form.formState.errors.phone.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-xs text-red-600">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t.message}</Label>
            <Textarea id="message" rows={5} {...form.register("message")} />
            {form.formState.errors.message ? (
              <p className="text-xs text-red-600">
                {form.formState.errors.message.message}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t.submit}
          </Button>
        </form>
      )}
    </div>
  );
}
