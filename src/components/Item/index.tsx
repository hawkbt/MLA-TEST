"use client";
import React from "react";
import "./item.scss";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";

const Item = (props: SearchItem) => {
  const { id, shipping, thumbnail, price, condition, original_price, title } = props;

  return (
    <div className='item'>
      <div className='item__image'>
        <img src={thumbnail} alt={title} />
      </div>
      <div className='item__info'>
        <h3 className='item__info__title'>
          <Link href={`/items/${id}`}>{title}</Link>
        </h3>
        <div className='item__info__price'>
          <div className='item__info__price__previous-price'>{formatCurrency(original_price)}</div>
          {formatCurrency(price)}
          <div className='item__info__price__discount'>6% OFF</div>
        </div>
        <div className='item__info__shipping'>{shipping.free_shipping}</div>
        <div className='item__info__condition'>{condition}</div>
      </div>
    </div>
  );
};

export default Item;
