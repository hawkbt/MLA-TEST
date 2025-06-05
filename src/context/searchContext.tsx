"use client";

import { searchItems } from "@/service/search/searchItems";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { createContext, useState } from "react";

type SearchContext = {
  searchData: Item[] | undefined;
  loading: boolean;
  params: Params | URLSearchParamsIterator<[string, string]>;
  searchValue: string;
  triggerSearchData: (value: string) => void;
};

const initialValues = {
  searchData: undefined,
  loading: false,
  params: {},
  searchValue: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  triggerSearchData: (_value: string) => {},
};

export const SearchContext = createContext<SearchContext>(initialValues);
const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useSearchParams();
  const [values, setValues] = useState({ ...initialValues, searchValue: params.get("search") ?? "" });

  const triggerSearchData = (value: string) => {
    setValues((v) => ({ ...v, searchValue: value }));
    const params = new URLSearchParams();
    params.set("search", value);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const { data, isLoading } = useQuery<Item[]>({
    queryKey: ["search", params],
    queryFn: () => searchItems({ search: params.get("search") as string }),
  });

  const provider = {
    searchData: data,
    loading: isLoading,
    searchValue: values.searchValue,
    params: params.entries(),
    triggerSearchData,
  };

  return <SearchContext.Provider value={provider}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
