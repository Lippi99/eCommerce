import { gql } from "@apollo/client";
import type { GetServerSideProps } from "next";
import { client } from "../../apollo-client";
import { css } from "../../stitches.config";
import { Box } from "../components/Box";
import { Card } from "../components/Card";
import { Grid } from "../components/Grid/Grid";
import { Header } from "../components/Header";
import { Section } from "../components/Section";
import { Product, Category } from "../types";
import NextLink from "next/link";

const Home = ({ products }: any) => {
  const title = css({
    fontWeight: 400,
    marginBottom: "$8",
    fontSize: "$8",
    fontFamily: `Raleway,sans-serif`,
    color: "$darkGray",
  });

  return (
    <Box>
      <Section css={{ paddingLeft: "$8", paddingRight: "$8" }}>
        <h1 className={title()}>Category name</h1>
        <Grid columns={3} gap={4}>
          {products?.category?.products?.map((product: Product) => {
            return (
              <NextLink href={`/product/${product.id}`} key={product.id}>
                <a>
                  <Card
                    alt={product.name}
                    key={product.id}
                    src={product.gallery[0]}
                    title={product.name}
                    prices={product.prices}
                  />
                </a>
              </NextLink>
            );
          })}
        </Grid>
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
            prices {
              amount
              currency
            }
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
