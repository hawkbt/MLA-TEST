import ItemList from "@/components/Items/ItemList";
import SearchFooter from "@/components/SearchFooter";
import { searchItems } from "@/service/search/searchItems";
import React from "react";

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { offset, search } = await searchParams;
  const data = await searchItems({ search: search as string, offset: offset as string });

  return (
    <>
      <main>
        <ItemList searchData={data} />
      </main>
      <SearchFooter />
    </>
  );
};

export default SearchPage;
