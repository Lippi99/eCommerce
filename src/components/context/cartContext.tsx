import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

interface CartContext {
  id?: string;
  total?: number;
  productsCart: Array<any>;
  setProductsCart?: () => void;
  handleAddProductToCart: (id: string) => void;
  handleRemoveProductToCart: (id: string) => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const CartContext = createContext<CartContext>({} as CartContext);

export const CartProvider = ({ children }: ChildrenProps) => {
  const [productsCart, setProductsCart] = useState<CartContext[]>("" as any);

  const handleAddProductToCart = (id: string) => {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => {
      return product.id === id;
    });

    if (!item) {
      copyProductsCart.push({ id: id, total: 1 } as any);
    } else {
      item.total! + 1;
    }
    setProductsCart(copyProductsCart);
    console.log(productsCart);
  };

  const handleRemoveProductToCart = (id: string) => {
    const copyProductsCart = [...productsCart];
    const item = copyProductsCart.find((product) => product.id === id);

    if (item) {
      if (item.total! > 1) {
        item.total = item.total! - 1;
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
