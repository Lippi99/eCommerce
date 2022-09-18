import { createContext, ReactNode, useContext, useState } from "react";
export interface ProductDetailsContext {
  size: string;
  setSize: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const ProductDetailsContext = createContext<ProductDetailsContext>(
  {} as ProductDetailsContext
);

export const ProductDetailsProvider = ({ children }: ChildrenProps) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  return (
    <ProductDetailsContext.Provider value={{ size, color, setSize, setColor }}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

export const useProductDetails = () => {
  const context = useContext(ProductDetailsContext);
  return context;
};
