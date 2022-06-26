import type { AppProps } from "next/app";
import { globalStyles } from "../../styles/global";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../apollo-client";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      {globalStyles()}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
