import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useCurrency } from "./currencyContext";
import { useProductDetails } from "./productDetailsContext";

export interface Product {
  id: string;
  name: string;
  gallery: string[];
  description: string;
  currency: string;
  color: string;
  size: string;
  inStock: boolean;
  category: string;
  amount: number;
  total?: number;
  brand: string;
  prices: Price[];
  attributes: ProductAttributes[];
}

interface ProductAttributes {
  id: string;
  name: string;
  items: ProductAttributesItems[];
}

interface ProductAttributesItems {
  displayValue: string;
  id: string;
  value: string;
}

interface Price {
  currency?: string;
  amount?: number;
}
interface CartContext {
  id?: string;
  name: string;
  total: number;
  size: string;
  color: string;
  prices: Price[];
  currency: string;
  productsCart?: Product[];
  amount: number;
  setProductsCart?: (product: CartContext) => void;
  handleAddProductToCart?: (products: any) => void;
  handleRemoveProductToCart?: (id: string) => void;
  cartDropDown?: boolean;
  setCartDropDown?: (value: any) => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const CartContext = createContext<CartContext>({} as CartContext);

export const CartProvider = ({ children }: ChildrenProps) => {
  const [productsCart, setProductsCart] = useState<CartContext[]>([]);
  const { currency } = useCurrency();
  let { size, color, setColor, setSize } = useProductDetails();
  const [cartDropDown, setCartDropDown] = useState(false);

  const handleAddProductToCart = (product: Product) => {
    const copyProductsCart = [...productsCart];
    const item = copyProductsCart.find((item) => {
      return item.name === product.name;
    });

    const matchingCurrency = product.prices.find((price) => {
      return price.currency === currency;
    });

    const amount = matchingCurrency?.amount;
    if (!item) {
      setColor("");
      setSize("");
      copyProductsCart.push({
        total: 1,
        ...product,
        currency,
        size,
        color,
        amount: amount!,
      });
    } else {
      item.total! += 1;
    }
    setProductsCart(copyProductsCart);
  };

  const handleRemoveProductToCart = (id: string) => {
    const copyProductsCart = [...productsCart];
    const item = copyProductsCart.find((product) => product.name === id);

    if (item && item.total > 1) {
      item.total -= 1;
      setProductsCart(copyProductsCart);
    } else {
      const productListFiltered = copyProductsCart.filter(
        (product) => product.name !== id
      );

      setProductsCart(productListFiltered);
    }
  };

  return (
    <CartContext.Provider
      value={
        {
          productsCart,
          handleAddProductToCart,
          handleRemoveProductToCart,
          setProductsCart,
          setCartDropDown,
          cartDropDown,
        } as any
      }
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
