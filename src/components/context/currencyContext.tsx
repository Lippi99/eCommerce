import { createContext, ReactNode, useContext, useState } from "react";

interface CurrencyPropsContext {
  currency: string;
  setCurrency: (value: string) => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const CurrencyContext = createContext<CurrencyPropsContext>(
  {} as CurrencyPropsContext
);

export const CurrencyProvider = ({ children }: ChildrenProps) => {
  const [currency, setCurrency] = useState("USD");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const currency = useContext(CurrencyContext);
  return currency;
};
