import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import React, { useMemo } from "react";
import "./itemInfo.scss";
import { formatCondition } from "@/utils/formatCondition";

type ItemInfoProps = {
  item: SearchItem | Item | undefined;
  isDetail?: boolean;
};

const ItemInfo = (props: ItemInfoProps) => {
  const { item, isDetail = false } = props;
  const { id = "", shipping, price, condition, title = "", seller, sale_price, installments, attributes } = item || {};

  const discount = useMemo(
    () => (sale_price?.metadata.campaign_discount_percentage ? `${sale_price?.metadata.campaign_discount_percentage}% OFF` : ""),
    [sale_price]
  );

  const color = useMemo(() => {
    const attr = attributes?.find(({ id }) => id === "COLOR");
    if (attr) {
      return attr.value_name;
    }
    return undefined;
  }, [attributes]);

  return (
    <div className={`item-info ${isDetail ? "detail" : ""}`}>
      {isDetail && <div className='item-info__status-units'>{formatCondition(condition || "")} |</div>}
      <h3 className='item-info__wrapper'>
        <Link href={`/items/${id}`}>
          <h3 className='item-info__wrapper__title'>{title}</h3>
        </Link>
        {seller?.nickname && <div className='item-info__wrapper__subtitle'>Por {seller?.nickname.toUpperCase()}</div>}
      </h3>
      <div className='item-info__price'>
        {sale_price?.regular_amount && (
          <div className='item-info__price__previous-price'>{formatCurrency(sale_price?.regular_amount, sale_price?.currency_id)}</div>
        )}
        <div className='item-info__price__current-price'>
          {formatCurrency(price, sale_price?.currency_id)}
          <div className='item-info__price__current-price__discount'>{discount}</div>
        </div>
        {installments?.rate === 0 && (
          <div className='item-info__price__installments'>
            Mismo precio en {installments?.quantity} de {formatCurrency(installments?.amount, installments?.currency_id)}
          </div>
        )}
      </div>
      <div className='item-info__shipping'>{shipping?.free_shipping && "Envio gratis"}</div>
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
