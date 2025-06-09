// Some of the fields are omited or just completelly defaulted seems the mocks seems to have outdated/incomplete data
export const transformSearchData = (results: SearchItem[], offset: number = 0, take: number = 5): SearchResponse => {
  const totalItems = results.length;

  const paginatedItems = results
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
    .slice(offset, offset + take);

  return {
    categories: results.map((item) => item.category_id),
    items: paginatedItems,
    currentPage: Math.floor(offset / take) + 1,
    hasMore: offset + take < totalItems,
    totalPages: Math.ceil(totalItems / take),
  };
};
