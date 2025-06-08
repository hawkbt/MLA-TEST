"use client";
import { SearchContext } from "@/context/searchContext";
import React, { useContext } from "react";
import "./searchFooter.scss";

const SearchFooter = () => {
  const { triggerSearchData, searchData, take } = useContext(SearchContext);
  if (!searchData) return null;
  const pages = Array.from({ length: (searchData?.items?.length > 0 && searchData?.totalPages) || 0 }, (_, index) => index + 1);

  const handlePage = (page: number) => triggerSearchData({ offset: page + take });

  return (
    <footer>
      {searchData?.items?.length === 0 && "No Results"}
      {pages.map((page) => (
        <button disabled={searchData.currentPage === page} key={page} tabIndex={0} onClick={() => handlePage(page)}>
          {page}
        </button>
      ))}
    </footer>
  );
};

export default SearchFooter;
