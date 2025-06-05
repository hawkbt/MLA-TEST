"use client";
import { SearchContext } from "@/context/searchContext";
import React, { useContext } from "react";
import Item from "../Item";

const ItemList = () => {
  const { searchData } = useContext(SearchContext);

  return (
    <>
      {searchData?.map((item: Item) => (
        <Item key={item.id} {...item} />
      ))}
    </>
  );
};

export default ItemList;
