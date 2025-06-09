import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { transformSearchData } from "@/utils/transformSearchData";
import { searchParamsSchema } from "@/schemas/searchParamsSchema";

const MOCKS_ROOT = path.join(process.cwd(), "src", "mocks");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = searchParamsSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }
  const q = parsed.data.search.toLowerCase().trim();
  const offset = parsed.data.offset ? parseInt(parsed.data.offset) : 0;
  const take = 5;
  try {
    const folders = await fs.readdir(MOCKS_ROOT, { withFileTypes: true });

    const matchingFolders = folders.filter((entry) => entry.isDirectory() && (q ? entry.name.toLowerCase().includes(q) : false));

    const matchedFiles: string[] = [];

    for (const folder of matchingFolders) {
      const folderPath = path.join(MOCKS_ROOT, folder.name);
      const files = await fs.readdir(folderPath);

      const matchingFiles = files.filter((file) => file.toLowerCase().includes("search"));
      // added this to filter just the files with search to simulate the list and not the details

      for (const file of matchingFiles) {
        matchedFiles.push(path.join(folderPath, file));
      }
    }

    if (matchedFiles.length === 0) {
      return NextResponse.json({ categories: [], items: [] });
    }

    const results: { results: SearchItem }[] = [];
    for (const filePath of matchedFiles) {
      const content = await fs.readFile(filePath, "utf8");
      const parsed = JSON.parse(content);

      if (Array.isArray(parsed)) {
        results.push(...parsed);
      } else {
        results.push(parsed);
      }
    }
    const data = transformSearchData(
      results.flatMap((r) => r.results),
      offset,
      take
    );
    return NextResponse.json(data);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
