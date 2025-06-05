import { globals } from "@/app/globals";

export const buildUrlWithParams = (props: { baseUrl?: string; params: URLSearchParamsIterator<[string, string]> | Params }): string => {
  const { baseUrl = globals.apiUrl!, params } = props;
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    if (Array.isArray(value)) {
      url.searchParams.delete(key);
      value.forEach((v) => {
        if (v !== undefined && v !== "") {
          url.searchParams.append(key, v);
        }
      });
    } else {
      if (value !== "") {
        url.searchParams.set(key, value);
      }
    }
  });

  return url.toString();
};
