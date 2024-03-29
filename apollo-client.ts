import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://ecommerceendpoint-production.up.railway.app/",
  // uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
