import { globals } from "@/globals";
import { searchParamsSchema } from "@/schemas/searchParamsSchema";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const rawParams = Object.fromEntries(url.searchParams);
  const updatedParams = {
    q: rawParams.search,
    offset: rawParams.offset,
  };
  const result = searchParamsSchema.safeParse(updatedParams);

  if (!result.success) {
    return new Response(JSON.stringify({ error: "Invalid query params", details: result.error.format() }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const validatedParams = result.data;

  const queryString = new URLSearchParams(Object.entries(validatedParams).map(([k, v]) => [k, String(v)])).toString();

  const response = await fetch(`${globals.apiUrl}/sites/MLA/search?${queryString}`);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      Authorization: `Bearer ${globals.token}`,
      "Content-Type": "application/json",
    },
  });
}
