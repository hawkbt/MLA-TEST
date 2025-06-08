// Some of the fields are omited or just completelly defaulted seems the mocks seems to have outdated/incomplete data
export const transformSearchData = (results: SearchItem[], offset: number, take: number) => {
  const data: SearchResponse = {
    categories: results.map((item) => item.category_id),
    items: results
      .map((item: SearchItem) => ({
        id: item.id,
        title: item.title,
        seller: item.seller.nickname,
        price: {
          currency: item.currency_id,
          amount: item.sale_price.amount,
          regular_amount: item.sale_price.regular_amount || undefined,
          discount: item.sale_price?.metadata.campaign_discount_percentage ? `${item.sale_price?.metadata.campaign_discount_percentage}` : "",
        },
        color: item.attributes?.find(({ id }) => id === "MAIN_COLOR")?.value_name,
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping ?? undefined,
        installments: {
          quantity: item.installments.quantity ?? undefined,
          rate: item.installments.rate,
          amount: item.installments.amount,
          currency: item.installments.currency_id,
        },
      }))
      .slice(offset, offset + take),
    currentPage: offset > 0 ? offset - take : 1,
    hasMore: offset + take < results.length,
    totalPages: Math.ceil(results.length / 5),
  };

  return data;
};
