import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "https://ecommerceendpoint.herokuapp.com/",
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
