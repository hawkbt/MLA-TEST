/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import ItemInfo from "../ItemInfo";
import VerticalCarousel from "@/components/VerticalCarousel";
import "./itemDetail.scss";

type ItemDetailProps = {
  item: Item;
};

const ItemDetail = (props: ItemDetailProps) => {
  const { item } = props;
  const [selected, setSelected] = useState(item.pictures[0].url) ?? "";
  const handleImageClick = (url: string) => setSelected(url);

  return (
    <div className='item-card'>
      <div className='item-detail'>
        <VerticalCarousel onSelectImage={handleImageClick} pictures={item?.pictures} selected={selected} />
        <div className='item-detail__image'>
          <img src={selected} alt={item?.id} />
        </div>
        <ItemInfo item={item} isDetail />
      </div>
      <div className='item-description'>
        <h3 className='item-description__title'>Description</h3>
        <p className='item-descirption__text'>{item?.description.plain_text}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
