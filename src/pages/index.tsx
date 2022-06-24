import { gql } from "@apollo/client";
import type { GetServerSideProps, NextPage } from "next";
import { client } from "../../apollo-client";
import { css } from "../../stitches.config";
import { Box } from "../components/Box";
import { Header } from "../components/Header";
import { Section } from "../components/Section";
import { Category, Products } from "../types";

const Home = ({ products }: Products) => {
  console.log(products);
  const title = css({
    fontWeight: 400,
    fontSize: "$8",
    fontFamily: `Raleway,sans-serif`,
    color: "$darkGray",
  });

  return (
    <Box>
      <Header />

      <Section css={{ paddingLeft: "$8", paddingRight: "$8" }}>
        <h1 className={title()}>Category name</h1>
      </Section>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<Category>({
    query: gql`
      query {
        category {
          products {
            id
            name
            gallery
            description
            category
          }
        }
      }
    `,
  });

  return {
    props: {
      products: data,
    },
  };
};
