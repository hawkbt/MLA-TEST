export function buildUrlWithParams({ baseUrl, params }: { baseUrl: string; params: URLSearchParams | Record<string, string> }): string {
  const searchParams = new URLSearchParams(params instanceof URLSearchParams ? params : Object.entries(params));
  return `${baseUrl}?${searchParams.toString()}`;
}
