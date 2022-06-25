 export interface Product {
  id:  string;
  name: string;
  gallery: string[];
  description: string;
  category: string;
  prices: Prices[];
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