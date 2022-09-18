import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { useCurrency } from "./currencyContext";
import { useProductDetails } from "./productDetailsContext";

interface CartContext {
  id?: string;
  total?: number;
  productsCart?: Array<any>;
  setProductsCart?: () => void;
  handleAddProductToCart?: (id: string, products: any) => void;
  handleRemoveProductToCart?: (id: string) => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const CartContext = createContext<CartContext>({} as CartContext);

export const CartProvider = ({ children }: ChildrenProps) => {
  const [productsCart, setProductsCart] = useState<CartContext[]>([]);
  const { currency } = useCurrency();
  const { size, color } = useProductDetails();

  const handleAddProductToCart = (id: string, products: any) => {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => {
      return product.id === id;
    });

    if (!item) {
      copyProductsCart.push({
        id: id,
        total: 1,
        ...products,
        currency,
        size,
        color,
      });
    } else {
      item.total = item.total && item.total + 1;
    }
    setProductsCart(copyProductsCart);
  };

  const handleRemoveProductToCart = (id: string) => {
    const copyProductsCart = [...productsCart];
    const item = copyProductsCart.find((product) => product.id === id);

    if (item) {
      if (item.total && item.total > 1) {
        item.total = item.total - 1;
        setProductsCart(copyProductsCart);
      }
    } else {
      const productListFiltered = copyProductsCart.filter(
        (product) => product.id !== id
      );
      setProductsCart(productListFiltered);
    }
  };

  return (
    <CartContext.Provider
      value={{
        productsCart,
        handleAddProductToCart,
        handleRemoveProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
