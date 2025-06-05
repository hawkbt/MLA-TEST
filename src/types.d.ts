type Price = {
  currency: string;
  amount: number;
  decimals: number;
  regular_amount: number;
};

type Attribute = {
  id: string;
  name: string;
  value_name: string;
};

type Item = {
  id: string;
  title: string;
  price: Price;
  pictures: string[];
  condition: "nuevo" | "usado" | "reacondicionado";
  free_shipping: boolean;
  sold_quantity: number;
  installments: string;
  description: string;
  attributes: Attribute[];
  category_path_from_root: string[];
};

type SearchItem = {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: string;
  listing_type_id: string;
  sanitized_title: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id: string;
  order_backend: number;
  price: number;
  original_price: number;
  sale_price: {
    price_id: string;
    amount: number;
    conditions: {
      eligible: true;
      context_restrictions: string[];
      start_time: string;
      end_time: string;
    };
    currency_id: string;
    exchange_rate: null;
    payment_method_prices: [];
    payment_method_type: string;
    regular_amount: number;
    type: string;
    metadata: {
      campaign_discount_percentage: number;
      promotion_id: string;
      order_item_price: number;
      campaign_end_date: string;
      variation: string;
      funding_mode: string;
      campaign_id: string;
      promotion_offer_type: string;
      experiment_id: string;
      promotion_type: string;
      discount_meli_amount: number;
    };
  };
  available_quantity: number;
  official_store_id: number;
  official_store_name: string;
  use_thumbnail_id: true;
  accepts_mercadopago: true;
  shipping: {
    store_pick_up: false;
    free_shipping: false;
    logistic_type: string;
    mode: string;
    tags: string[];
    benefits: null;
    promise: null;
    shipping_score: number;
  };
  stop_time: string;
  seller: { id: number; nickname: string };
  address: {
    state_id: string;
    state_name: string;
    city_id: string;
    city_name: string;
  };
  attributes: {
    id: string;
    name: string;
    value_id: string;
    value_name: string;
    attribute_group_id: string;
    attribute_group_name: string;
    value_struct: null;
    values: [
      {
        id: string;
        name: string;
      }
    ];
    source: number;
    value_type: string;
  }[];
  installments: {
    quantity: number;
    amount: number;
    rate: number;
    currency_id: string;
    metadata: {
      meliplus_installments: boolean;
      additional_bank_interest: boolean;
    };
  };
  winner_item_id: null;
  catalog_listing: true;
  discounts: null;
  promotion_decorations: null;
  promotions: null;
  inventory_id: string;
  installments_motors: null;
  result_type: string;
};

type SearchResult = {
  categories: string[];
  items: Item[];
};

type Params = { [key: string]: string | string[] | undefined };
