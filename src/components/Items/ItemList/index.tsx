"use client";
import { SearchContext } from "@/context/searchContext";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import Item from "../Item";
import "./list.scss";
import { useQuery } from "@tanstack/react-query";
import { searchItems } from "@/service/search/searchItems";
import { useSearchParams } from "next/navigation";

const ItemList = ({ searchData }: { searchData: SearchResponse | undefined }) => {
  const { handleSetSearchData } = useContext(SearchContext);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const paramsObj = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const stringSearchParams = useMemo(() => searchParams.toString(), [searchParams]);

  const { data } = useQuery<SearchResponse>({
    queryKey: ["search", paramsObj],
    queryFn: () => searchItems(searchParams),
    initialData: searchData,
  });

  useEffect(() => {
    if (data) handleSetSearchData(data);
  }, [data, handleSetSearchData]);

  useEffect(() => {
    listWrapperRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [stringSearchParams]);

  return (
    <div className='list-wrapper' ref={listWrapperRef}>
      {data?.items?.map((item: ListItem) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ItemList;
