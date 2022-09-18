import type { AppProps } from "next/app";
import { globalStyles } from "../../styles/global";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../apollo-client";
import { Layout } from "../components/Layout";
import { CurrencyProvider } from "../components/context/currencyContext";
import { CartProvider } from "../components/context/cartContext";
import { ProductDetailsProvider } from "../components/context/productDetailsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductDetailsProvider>
      <CurrencyProvider>
        <CartProvider>
          <ApolloProvider client={client}>
            {globalStyles()}
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </CartProvider>
      </CurrencyProvider>
    </ProductDetailsProvider>
  );
}

export default MyApp;
