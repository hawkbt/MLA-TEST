"use client";

import { searchItems } from "@/service/search/searchItems";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

type SearchContext = {
  searchData: SearchResponse | undefined;
  loading: boolean;
  params: URLSearchParams;
  searchValue: string;
  take: number;
  offset: string;
  triggerSearchData: ({ value, offset }: { value?: string; offset?: number }) => void;
};

const initialValues: SearchContext = {
  searchData: undefined,
  loading: false,
  params: new URLSearchParams(),
  searchValue: "",
  take: 5,
  offset: "",
  triggerSearchData: () => {},
};

export const SearchContext = createContext<SearchContext>(initialValues);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") ?? "");
  const [offset, setOffset] = useState<string>(searchParams.get("offset") ?? "0");

  useEffect(() => {
    const val = searchParams.get("search") ?? "";
    setSearchValue(val);
    const valOff = searchParams.get("offset") ?? "";
    setOffset(valOff);
  }, [searchParams]);

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ["search", searchValue, offset],
    queryFn: async () => {
      if (!searchValue) return [];
      return await searchItems({ search: searchValue, offset, take: "5" });
    },
    enabled: !!searchValue,
  });

  const triggerSearchData = useCallback(
    ({ value, offset }: { value?: string; offset?: number }) => {
      const newParams = new URLSearchParams(window.location.search);
      if (value) {
        newParams.set("search", value);
        setSearchValue(value);
      }
      if (offset) {
        newParams.set("offset", offset.toString());
        setOffset(offset.toString());
      }

      const newUrl = `/items?${newParams.toString()}`;
      router.push(newUrl);
    },
    [router]
  );

  const contextValue: SearchContext = useMemo(
    () => ({
      searchData: data,
      offset,
      loading: isLoading,
      searchValue,
      take: 5,
      triggerSearchData,
      params: new URLSearchParams(searchParams.toString()),
    }),
    [data, isLoading, searchValue, searchParams, triggerSearchData, offset]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
