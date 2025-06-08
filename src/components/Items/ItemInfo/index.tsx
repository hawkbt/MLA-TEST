import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import React from "react";
import "./itemInfo.scss";
import { formatCondition } from "@/utils/formatCondition";

type ItemInfoProps = {
  item: DetailItem | ListItem | undefined;
  isDetail?: boolean;
};

const ItemInfo = (props: ItemInfoProps) => {
  const { item, isDetail = false } = props;
  const { id = "", free_shipping, price, condition, title = "", seller, installments, color } = item || {};

  return (
    <div className={`item-info ${isDetail ? "detail" : ""}`}>
      {isDetail && <div className='item-info__status-units'>{formatCondition(condition || "")} |</div>}
      <h3 className='item-info__wrapper'>
        <Link href={`/items/${id}`}>
          <h3 className='item-info__wrapper__title'>{title}</h3>
        </Link>
        {seller && <div className='item-info__wrapper__subtitle'>Por {seller.toUpperCase()}</div>}
      </h3>
      <div className='item-info__price'>
        {price?.regular_amount && <div className='item-info__price__previous-price'>{formatCurrency(price?.regular_amount, price?.currency)}</div>}
        <div className='item-info__price__current-price'>
          {formatCurrency(price?.amount, price?.currency)}
          <div className='item-info__price__current-price__discount'>{price?.discount}</div>
        </div>
        {installments?.rate === 0 && (
          <div className='item-info__price__installments'>
            Mismo precio en {installments?.quantity} de {formatCurrency(installments?.amount, installments?.currency)}
          </div>
        )}
      </div>
      <div className='item-info__free_shipping'>{free_shipping && "Envio gratis"}</div>
      {!isDetail && <div className='item-info__condition'>{formatCondition(condition || "")}</div>}
      {isDetail && color && (
        <div className='item-info__color'>
          Color: <span>{color}</span>
        </div>
      )}
    </div>
  );
};

export default ItemInfo;
