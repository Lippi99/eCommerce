export interface Product {
  id: string;
  name: string;
  total: number;
  amount: number;
  gallery: string[];
  description: string;
  category: string;
  inStock: boolean;
  prices: Prices[];
  size: string;
  color: string;
  currency: string;
}

export interface Products {
  products: Product[];
}

export interface Category {
  category: Products[];
}

export interface Prices {
  amount: number;
  currency: string;
}
