type Shipping = {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  mode: string;
  tags: string[];
  benefits: string;
  promise: string;
  shipping_score: number;
};

type Category = {
  id: string;
  name: string;
  picture: string;
  permalink: string;
  total_items_in_this_category: number;
  path_from_root: [
    {
      id: string;
      name: string;
    }
  ];
  children_categories: [];
  attribute_types: string;
  settings: {
    adult_content: boolean;
    buying_allowed: true;
    buying_modes: string[];
    catalog_domain: string;
    coverage_areas: string;
    currencies: string[];
    fragile: boolean;
    immediate_payment: string;
    item_conditions: string[];
    items_reviews_allowed: boolean;
    listing_allowed: true;
    max_description_length: number;
    max_pictures_per_item: number;
    max_pictures_per_item_var: number;
    max_sub_title_length: number;
    max_title_length: number;
    max_variations_allowed: number;
    maximum_price: number;
    maximum_price_currency: string;
    minimum_price: number;
    minimum_price_currency: string;
    mirror_category: string;
    mirror_master_category: string;
    mirror_slave_categories: [];
    price: string;
    reservation_allowed: string;
    restrictions: [];
    rounded_address: boolean;
    seller_contact: string;
    shipping_options: string[];
    shipping_profile: string;
    show_contact_information: boolean;
    simple_shipping: string;
    stock: string;
    sub_vertical: string;
    subscribable: boolean;
    tags: [];
    vertical: string;
    vip_subdomain: string;
    buyer_protection_programs: string[];
    status: string;
  };
  channels_settings: [
    {
      channel: string;
      settings: {
        minimum_price: number;
      };
    },
    {
      channel: string;
      settings: {
        status: string;
      };
    },
    {
      channel: string;
      settings: {
        buying_modes: string[];
        immediate_payment: string;
        minimum_price: number;
        status: string;
      };
    },
    {
      channel: string;
      settings: {
        buying_modes: string[];
        immediate_payment: string;
        minimum_price: number;
        status: string;
      };
    }
  ];
  meta_categ_id: string;
  attributable: boolean;
  date_created: string;
};

type Description = {
  text: string;
  plain_text: string;
  last_updated: string;
  date_created: string;
  snapshot: {
    url: string;
    width: number;
    height: number;
    status: string;
  };
};

type Picture = {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
};

type Attribute = {
  id: string;
  name: string;
  value_id: string;
  value_name: string;
  attribute_group_id: string;
  attribute_group_name: string;
  value_struct: string;
  values: [
    {
      id: string;
      name: string;
    }
  ];
  source: number;
  value_type: string;
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
    exchange_rate: string;
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
  shipping: Shipping;
  stop_time: string;
  seller: { id: number; nickname: string };
  address: {
    state_id: string;
    state_name: string;
    city_id: string;
    city_name: string;
  };
  attributes: Attribute[];
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
  winner_item_id: string;
  catalog_listing: true;
  discounts: string;
  promotion_decorations: string;
  promotions: string;
  inventory_id: string;
  installments_motors: string;
  result_type: string;
};

type SearchResult = {
  categories: string[];
  items: Item[];
};

type RawItem = {
  initial_quantity: number;
  currency_id: string;
  id: string;
  title: string;
  price: number;
  original_price: number | undefined;
  shipping: Shipping;
  pictures: Picture[];
  condition: string;
  attributes: Attribute[];
  category: Category;
  description: Description;
};

type Params = { [key: string]: string | string[] | undefined };

type Price = {
  currency: string;
  amount: number;
  regular_amount: number | undefined;
  discount: string | undefined;
};

type SharedItem = {
  id: string;
  title: string;
  seller: string;
  price: Price;
  condition: string;
  color?: string;
  free_shipping?: boolean;
  installments: {
    quantity?: number;
    amount?: number;
    rate?: number;
    currency?: string;
  };
};

type ListItem = SharedItem & {
  picture: string;
};

type DetailItem = SharedItem & {
  pictures: string[];
  sold_quantity: number;
  description: string;
  attributes: {
    id: string;
    name: string;
    value: string;
  }[];
  category_path_from_root: string[];
};

type DetailResponse = {
  item: DetailItem;
};

type SearchResponse = {
  categories: string[];
  items: ListItem[];
};
