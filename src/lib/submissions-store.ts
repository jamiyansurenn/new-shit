import { promises as fs } from "node:fs";
import path from "node:path";
import type { ContactSubmission } from "@/types";

const submissionsFile = path.join(process.cwd(), "data", "submissions.json");

async function ensureFile() {
  try {
    await fs.access(submissionsFile);
  } catch {
    await fs.mkdir(path.dirname(submissionsFile), { recursive: true });
    await fs.writeFile(submissionsFile, "[]", "utf-8");
  }
}

export async function getStoredSubmissions(): Promise<ContactSubmission[]> {
  await ensureFile();
  const raw = await fs.readFile(submissionsFile, "utf-8");
  const parsed = JSON.parse(raw) as ContactSubmission[];
  return parsed.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addStoredSubmission(
  item: Omit<ContactSubmission, "id" | "createdAt" | "read">,
): Promise<ContactSubmission> {
  const current = await getStoredSubmissions();
  const created: ContactSubmission = {
    id: `local-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
    ...item,
  };

  await fs.writeFile(
    submissionsFile,
    JSON.stringify([created, ...current], null, 2),
    "utf-8",
  );

  return created;
}
