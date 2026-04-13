import { NextResponse } from "next/server";
import { getStoredSubmissions } from "@/lib/submissions-store";

export async function GET() {
  try {
    try {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      const rows = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      });
      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        persisted: true,
        data: rows.map((row) => ({
          id: String(row.id),
          name: row.name,
          phone: row.phone,
          email: row.email,
          message: row.message,
          read: row.read,
          createdAt: row.createdAt.toISOString(),
        })),
      });
    } catch {
      const localRows = await getStoredSubmissions();
      return NextResponse.json({
        success: true,
        persisted: false,
        data: localRows,
      });
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to load submissions",
      },
      { status: 500 },
    );
  }
}
