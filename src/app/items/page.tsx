import ItemList from "@/components/Items/ItemList";
import SearchFooter from "@/components/SearchFooter";
import { searchItems } from "@/service/search/searchItems";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const search = (await searchParams).search;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["items", search],
    queryFn: () => searchItems({ search: search as string }),
  });
  return (
    <>
      <main>
        <ItemList />
      </main>{" "}
      <SearchFooter />
    </>
  );
};

export default SearchPage;
