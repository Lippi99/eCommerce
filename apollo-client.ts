import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://ecommerceendpoint.herokuapp.com/",
  cache: new InMemoryCache(),
});
