import type { AppProps } from "next/app";
import { globalStyles } from "../../styles/global";
import { ApolloProvider, gql } from "@apollo/client";
import { client } from "../../apollo-client";
import { Layout } from "../components/Layout";
import { CurrencyProvider } from "../components/context/currencyContext";
import { CartProvider } from "../components/context/cartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
