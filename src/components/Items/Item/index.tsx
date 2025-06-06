/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./item.scss";
import ItemInfo from "../ItemInfo";

const Item = (props: SearchItem) => {
  const { thumbnail, title } = props;
  return (
    <div className='item'>
      <div className='item__image'>
        <img src={thumbnail} alt={title} />
      </div>
      <ItemInfo item={props} />
    </div>
  );
};

export default Item;
