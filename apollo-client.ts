import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.PORT,
  cache: new InMemoryCache(),
});
