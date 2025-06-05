import { buildUrlWithParams } from "@/utils/buildUrlWithParams";

export const searchItems = async (params: URLSearchParamsIterator<[string, string]> | Params) => {
  const url = buildUrlWithParams({ params });
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};
