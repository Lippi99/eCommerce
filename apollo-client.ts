import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.PORT || "http://localhost:4000/",
  cache: new InMemoryCache(),
});
