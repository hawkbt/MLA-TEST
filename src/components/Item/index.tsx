"use client";
import React, { useMemo } from "react";
import "./item.scss";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";

const Item = (props: SearchItem) => {
  const { id, shipping, thumbnail, price, condition, title, seller, sale_price, installments } = props;
  const discount = useMemo(
    () => (sale_price.metadata.campaign_discount_percentage ? `${sale_price.metadata.campaign_discount_percentage}% OFF` : ""),
    [sale_price]
  );
  return (
    <div className='item'>
      <div className='item__image'>
        <img src={thumbnail} alt={title} />
      </div>
      <div className='item__info'>
        <h3 className='item__info__wrapper'>
          <h3 className='item__info__wrapper__title'>
            <Link href={`/items/${id}`}>{title}</Link>
          </h3>
          {seller.nickname && <div className='item__info__wrapper__subtitle'>Por {seller.nickname.toUpperCase()}</div>}
        </h3>
        <div className='item__info__price'>
          {sale_price.regular_amount && (
            <div className='item__info__price__previous-price'>{formatCurrency(sale_price.regular_amount, sale_price.currency_id)}</div>
          )}
          <div className='item__info__price__current-price'>
            {formatCurrency(price, sale_price.currency_id)}
            <div className='item__info__price__current-price__discount'>{discount}</div>
          </div>
          {installments?.rate === 0 && (
            <div className='item__info__price__installments'>
              Mismo precio en {installments.quantity} de {formatCurrency(installments.amount, installments.currency_id)}
            </div>
          )}
        </div>
        <div className='item__info__shipping'>{shipping.free_shipping && "Envio gratis"}</div>
        <div className='item__info__condition'>{condition}</div>
      </div>
    </div>
  );
};

export default Item;
