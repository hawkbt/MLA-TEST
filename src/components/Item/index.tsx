"use client";
import React from "react";
import "./item.scss";
import Link from "next/link";

const Item = (props: Item) => {
  const { id, free_shipping, price, title, pictures, condition } = props;

  return (
    <div className='item'>
      <div className='item__image'></div>
      <div className='item__info'>
        <h3 className='item__info__title'>
          <Link href={`/items/${id}`}>name</Link>
        </h3>
        <div className='item__info__price'></div>
        <div className='item__info__shipping'></div>
        <div className='item__info__status'></div>
      </div>
    </div>
  );
};

export default Item;
