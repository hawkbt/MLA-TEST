"use client";
import { SearchContext } from "@/context/searchContext";
import React, { useContext } from "react";
import Item from "../Item";
import "./list.scss";

const ItemList = () => {
  const { searchData } = useContext(SearchContext);
  return (
    <div className='list-wrapper'>
      {searchData?.items?.map((item: ListItem) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ItemList;
