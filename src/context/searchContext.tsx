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
  triggerSearchData: (value: string) => void;
};

const initialValues: SearchContext = {
  searchData: undefined,
  loading: false,
  params: new URLSearchParams(),
  searchValue: "",
  triggerSearchData: () => {},
};

export const SearchContext = createContext<SearchContext>(initialValues);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") ?? "");

  useEffect(() => {
    const val = searchParams.get("search") ?? "";
    setSearchValue(val);
  }, [searchParams]);

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      if (!searchValue) return [];
      return await searchItems({ search: searchValue });
    },
    enabled: !!searchValue,
  });

  const triggerSearchData = useCallback(
    (value: string) => {
      const newParams = new URLSearchParams(window.location.search);
      newParams.set("search", value);
      const newUrl = `/items?${newParams.toString()}`;
      router.push(newUrl);
      setSearchValue(value);
    },
    [router]
  );

  const contextValue: SearchContext = useMemo(
    () => ({
      searchData: data,
      loading: isLoading,
      searchValue,
      triggerSearchData,
      params: new URLSearchParams(searchParams.toString()),
    }),
    [data, isLoading, searchValue, searchParams, triggerSearchData]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
