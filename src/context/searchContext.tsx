"use client";

import { searchItems } from "@/service/search/searchItems";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";

type SearchContext = {
  searchData: SearchItem[] | undefined;
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

  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") ?? "");

  useEffect(() => {
    const val = searchParams.get("search") ?? "";
    setSearchValue(val);
  }, [searchParams]);

  const { data, isLoading } = useQuery<SearchItem[]>({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      if (!searchValue) return [];
      return await searchItems({ search: searchValue });
    },
    enabled: !!searchValue,
  });

  const triggerSearchData = (value: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("search", value);
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    setSearchValue(value);
  };

  const contextValue: SearchContext = useMemo(
    () => ({
      searchData: data,
      loading: isLoading,
      searchValue,
      triggerSearchData,
      params: new URLSearchParams(searchParams.toString()),
    }),
    [data, isLoading, searchValue, searchParams]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
