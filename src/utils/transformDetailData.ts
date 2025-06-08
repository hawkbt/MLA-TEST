// Some of the fields are omited or just completelly defaulted seems the mocks seems to have outdated/incomplete data
export const transformDetailData = (result: RawItem) => {
  const data: DetailResponse = {
    item: {
      id: result.id,
      title: result.title,
      seller: "",
      sold_quantity: result.initial_quantity,
      price: {
        currency: result.currency_id,
        amount: result.price,
        regular_amount: result.original_price || undefined,
        discount: "",
      },
      attributes: result.attributes.map((a: Attribute) => ({
        id: a.id,
        name: a.name,
        value: a.value_name,
      })),
      pictures: result.pictures.map((p) => p.url),
      category_path_from_root: result.category.path_from_root.map((p) => p.name),
      description: result.description.plain_text,
      color: result.attributes?.find(({ id }) => id === "COLOR")?.value_name,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping ?? undefined,
      installments: {
        quantity: undefined,
        rate: undefined,
        amount: undefined,
        currency: undefined,
      },
    },
  };

  return data;
};
