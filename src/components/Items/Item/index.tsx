/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./item.scss";
import ItemInfo from "../ItemInfo";

const Item = (props: ListItem) => {
  const { picture, title } = props;
  return (
    <div className='item'>
      <div className='item__image'>
        <img src={picture} alt={title} />
      </div>
      <ItemInfo item={props} />
    </div>
  );
};

export default Item;
