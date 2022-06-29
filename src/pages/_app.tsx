import type { AppProps } from "next/app";
import { globalStyles } from "../../styles/global";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../apollo-client";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { CurrencyProvider } from "../components/context/currencyContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <ApolloProvider client={client}>
        {globalStyles()}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </CurrencyProvider>
  );
}

export default MyApp;
