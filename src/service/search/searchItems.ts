import { buildUrlWithParams } from "@/utils/buildUrlWithParams";

export const searchItems = async (params: URLSearchParams | Record<string, string>) => {
  const url = buildUrlWithParams({ baseUrl: `${process.env.NEXT_PUBLIC_URL}/api/items`, params });
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};
