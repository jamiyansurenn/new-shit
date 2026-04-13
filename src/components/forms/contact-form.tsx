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
    expectation: string;
    success: string;
    error: string;
    errors: Record<string, string>;
  }
> = {
  mn: {
    title: "Зурвас илгээх",
    name: "Овог нэр",
    phone: "Утас",
    email: "И-мэйл",
    message: "Зурвас",
    submit: "Хүсэлт илгээх",
    expectation: "Ихэнхдээ ажлын цагт 1 цагийн дотор эргэн холбогдоно.",
    success: "Хүсэлт амжилттай бүртгэгдлээ. Манай мэргэжилтэн тун удахгүй холбогдоно.",
    error: "Алдаа гарлаа. Дахин оролдох эсвэл утсаар холбогдоно уу.",
    errors: {},
  },
  en: {
    title: "Send a message",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    message: "Message",
    submit: "Send inquiry",
    expectation: "We usually respond within business hours, often within one hour.",
    success: "Your inquiry has been received. Our advisor will contact you shortly.",
    error: "Something went wrong. Please try again or call us directly.",
    errors: {},
  },
};

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = copy[locale];
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("submission_failed");
      }
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError(t.error);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <h2 className="font-serif-display text-xl font-semibold">{t.title}</h2>
      <p className="mt-2 text-sm text-muted">{t.expectation}</p>
      {submitted ? (
        <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
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
            {form.formState.isSubmitting
              ? locale === "mn"
                ? "Илгээж байна..."
                : "Submitting..."
              : t.submit}
          </Button>
          {submitError ? (
            <p className="text-xs text-red-600" role="alert">
              {submitError}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
