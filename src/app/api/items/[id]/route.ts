import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { transformDetailData } from "@/utils/transformDetailData";

const MOCKS_ROOT = path.join(process.cwd(), "src", "mocks");

async function findMatchingFilesRecursively(dir: string, keyword: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const matchedFiles: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nestedMatches = await findMatchingFilesRecursively(entryPath, keyword);
      matchedFiles.push(...nestedMatches);
    } else if (entry.isFile() && entry.name.toLowerCase().includes(keyword)) {
      matchedFiles.push(entryPath);
    }
  }

  return matchedFiles;
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const q = (await params).id.toLowerCase().trim();

  try {
    const matchedFiles = await findMatchingFilesRecursively(MOCKS_ROOT, q);

    if (matchedFiles.length === 0) {
      return NextResponse.json({ error: `No mock data found for ID: ${q}` }, { status: 404 });
    }

    let result: Record<string, unknown> = {};

    for (const filePath of matchedFiles) {
      const content = await fs.readFile(filePath, "utf8");
      const parsed = JSON.parse(content);
      if (filePath.includes("category")) {
        result.category = parsed;
      } else if (filePath.includes("description")) {
        result.description = parsed;
      } else {
        result = { ...result, ...parsed };
      }
    }
    const data = transformDetailData(result as RawItem);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
