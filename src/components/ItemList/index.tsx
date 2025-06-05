"use client";
import { SearchContext } from "@/context/searchContext";
import React, { useContext } from "react";
import Item from "../Item";

const ItemList = () => {
  const { searchData } = useContext(SearchContext);
  console.log(searchData);
  return (
    <>
      {searchData?.map((item: SearchItem) => (
        <Item key={item.id} {...item} />
      ))}
    </>
  );
};

export default ItemList;
