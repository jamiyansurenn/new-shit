import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { addStoredSubmission } from "@/lib/submissions-store";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = contactFormSchema.parse(body);
    let createdAt = new Date().toISOString();
    let id = `local-${Date.now()}`;
    let persisted = false;

    try {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      const created = await prisma.contactSubmission.create({
        data: {
          name: input.name,
          phone: input.phone,
          email: input.email,
          message: input.message,
        },
      });
      id = String(created.id);
      createdAt = created.createdAt.toISOString();
      persisted = true;
      await prisma.$disconnect();
    } catch {
      const created = await addStoredSubmission({
        name: input.name,
        phone: input.phone,
        email: input.email,
        message: input.message,
      });
      id = created.id;
      createdAt = created.createdAt;
      persisted = false;
    }

    return NextResponse.json({
      success: true,
      persisted,
      id,
      createdAt,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.flatten(),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit request right now",
      },
      { status: 500 },
    );
  }
}
