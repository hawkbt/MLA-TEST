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

type SearchResult = {
  categories: string[];
  items: Item[];
};

type Params = { [key: string]: string | string[] | undefined };
