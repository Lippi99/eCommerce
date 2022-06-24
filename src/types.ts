 export interface Product {
  id:  string;
  name: string;
  gallery: string[];
  description: string;
  category: string;
}

export interface Products {
  products: Product[];
}

export interface Category {
  category: Products[];
}