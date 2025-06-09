"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

type SearchContext = {
  searchData: SearchResponse | undefined;
  handleSetSearchData: (data: SearchResponse) => void;
  params: URLSearchParams;
  searchValue: string;
  take: number;
  offset: string;
  triggerSearchData: ({ value, offset }: { value?: string; offset?: string }) => void;
};

const initialValues: SearchContext = {
  searchData: undefined,
  handleSetSearchData: () => {},
  params: new URLSearchParams(),
  searchValue: "",
  take: 5,
  offset: "0",
  triggerSearchData: () => {},
};

export const SearchContext = createContext<SearchContext>(initialValues);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchResponse | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") ?? "");
  const [offset, setOffset] = useState<string>(searchParams.get("offset") ?? "0");

  useEffect(() => {
    const val = searchParams.get("search") ?? "";
    setSearchValue(val);
    const valOff = searchParams.get("offset") ?? "0";
    setOffset(valOff);
  }, [searchParams]);

  const triggerSearchData = useCallback(
    ({ value, offset }: { value?: string; offset?: string }) => {
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

  const handleSetSearchData = useCallback((data: SearchResponse) => setSearchData(data), [setSearchData]);

  const contextValue: SearchContext = useMemo(
    () => ({
      searchData,
      handleSetSearchData,
      offset,
      searchValue,
      take: 5,
      triggerSearchData,
      params: new URLSearchParams(searchParams.toString()),
    }),
    [searchData, searchValue, searchParams, triggerSearchData, offset, handleSetSearchData]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
