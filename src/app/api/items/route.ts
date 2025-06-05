import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type SearchResult = {
  id: string;
  title: string;
  description: string;
}[];

const MOCKS_ROOT = path.join(process.cwd(), "src", "mocks");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("search")?.toLowerCase().trim();
  try {
    const folders = await fs.readdir(MOCKS_ROOT, { withFileTypes: true });

    const matchingFolders = folders.filter((entry) => entry.isDirectory() && (q ? entry.name.toLowerCase().includes(q) : false));

    const matchedFiles: string[] = [];

    for (const folder of matchingFolders) {
      const folderPath = path.join(MOCKS_ROOT, folder.name);
      const files = await fs.readdir(folderPath);

      const matchingFiles = files.filter((file) => file.toLowerCase().includes(q!));

      for (const file of matchingFiles) {
        matchedFiles.push(path.join(folderPath, file));
      }
    }

    if (matchedFiles.length === 0) {
      return NextResponse.json([]);
    }

    const results: SearchResult = [];
    for (const filePath of matchedFiles) {
      const content = await fs.readFile(filePath, "utf8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        results.push(...parsed);
      } else {
        results.push(parsed);
      }
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
