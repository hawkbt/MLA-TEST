import React from "react";
import "./itemAttributes.scss";

const ItemAttributes = ({ item }: { item: DetailItem }) => {
  return (
    <div className='item-attributes'>
      <h3 className='item-attributes__title'>Caracteristicas</h3>
      <div className='item-attributes__grid'>
        {item?.attributes.map((attribute) => (
          <div className='item-attributes__article' key={attribute.id}>
            <h4>{attribute.name}</h4>
            <span>{attribute.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemAttributes;
