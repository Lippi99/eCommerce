import React from "react";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { client } from "../../../apollo-client";
import { Box } from "../../components/Box";
import { Flex } from "../../components/Flex";
import { Section } from "../../components/Section";
import NextImage from "next/image";
import { css } from "../../../stitches.config";
import { Button } from "../../components/Button";
import { useCurrency } from "../../components/context/currencyContext";
import { useCart } from "../../components/context/cartContext";
import { useProductDetails } from "../../components/context/productDetailsContext";
import NextHead from "next/head";
import { ProductSize } from "../../components/ProductSize";
import { ProductColor } from "../../components/ProductColor";

export interface Product {
  product: {
    name: string;
    gallery: string[];
    description: string;
    inStock: boolean;
    category: string;
    brand: string;
    prices: Price[];
    attributes: ProductAttributes[];
  };
}

interface ProductAttributes {
  id: string;
  name: string;
  items: ProductAttributesItems[];
}

interface ProductAttributesItems {
  displayValue: string;
  id: string;
  value: string;
}

interface Price {
  currency: string;
  amount: number;
}

export default function Details({ product }: Product) {
  const { size, setSize, color, setColor } = useProductDetails();

  const { handleAddProductToCart } = useCart();

  const productDetail = css({
    variants: {
      variant: {
        title: {
          color: "$darkGray",
          fontFamily: `Raleway,sans-serif`,
          fontSize: "$6",
        },
        subTitle: {
          color: "$darkGray",
          fontFamily: `Roboto Condensed,sans-serif`,
          fontSize: "$6",
          textTransform: "uppercase",
        },
        description: {
          color: "$darkGray",
          fontFamily: `Raleway,sans-serif`,
          fontSize: "$6",
          padding: " $2 0",
        },
        size: {
          width: "63px",
          height: "45px",
          cursor: "pointer",
          border: "1px solid $darkGray",
          marginRight: "$2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        sizeSelected: {
          width: "63px",
          height: "45px",
          cursor: "pointer",
          color: "white",
          border: "1px solid $darkGray",
          backgroundColor: "$darkGray",
          marginRight: "$2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        color: {
          width: "32px",
          height: "32px",
          marginRight: "$2",
          cursor: "pointer",
        },
        colorSelected: {
          width: "32px",
          height: "32px",
          marginRight: "$2",
          border: "2px solid $lightGreen",
        },
      },
    },
  });

  const { currency } = useCurrency();

  const description = product.description.replace(/(<([^>]+)>)/gi, "");

  return (
    <>
      <NextHead>
        <title>{product.name}</title>
        <meta
          property="og:title"
          content={product.category}
          key={product.category}
        />
      </NextHead>
      <Section css={{ paddingLeft: "$8", paddingRight: "$8" }}>
        <Flex
          css={{
            maxWidth: "1150px",
            width: "100%",
            "@bp2": {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
          align="start"
        >
          <Flex
            direction="column"
            css={{
              "@bp2": {
                display: "none",
              },
            }}
          >
            {product.gallery
              .map((gallery) => (
                <React.Fragment key={gallery}>
                  <NextImage
                    width={150}
                    height={150}
                    src={gallery}
                    objectFit="contain"
                  />
                </React.Fragment>
              ))
              .slice(0, 3)}
          </Flex>
          <Box>
            <NextImage
              width={400}
              height={500}
              src={product.gallery[0]}
              objectFit="contain"
            />
          </Box>
          <Flex
            css={{
              width: "50%",
              marginLeft: "$9",
              "@bp2": {
                width: "100%",
                margin: 0,
                alignItems: "center",
              },
            }}
            direction="column"
            align="start"
          >
            <Box css={{ marginBottom: "$4" }}>
              <h1 className={productDetail({ variant: "title" })}>
                {product.name}
              </h1>
              <p className={productDetail({ variant: "description" })}>
                {product.brand}
              </p>
            </Box>
            <Flex css={{ marginBottom: "$4" }} align="center">
              {product.attributes[0]?.items && (
                <h2 className={productDetail({ variant: "subTitle" })}>
                  {product.attributes[0].name}:
                </h2>
              )}
              {product.attributes[0]?.items
                ? product.attributes[0].items.map((attribute) => {
                    return (
                      <ProductSize key={attribute.id} value={attribute.value} />
                    );
                  })
                : null}
            </Flex>
            <Box css={{ marginBottom: "$4" }}>
              {product.attributes[1]?.items && (
                <h2 className={productDetail({ variant: "subTitle" })}>
                  {product.attributes[1].name}:
                </h2>
              )}
              <Flex>
                {product.attributes[1]?.items
                  ? product.attributes[1].items.map((attribute) => {
                      return (
                        <ProductColor
                          key={attribute.id}
                          value={attribute.value}
                          id={attribute.id}
                        />
                      );
                    })
                  : null}
              </Flex>
            </Box>
            <Box>
              <h2
                style={{ marginBottom: "10px" }}
                className={productDetail({ variant: "subTitle" })}
              >
                Price:
              </h2>
              {product.prices.map((price, index) => {
                const productValue =
                  currency === price.currency && `${currency} ${price.amount}`;
                return (
                  <p
                    key={index}
                    className={productDetail({ variant: "subTitle" })}
                  >
                    {productValue}
                  </p>
                );
              })}
            </Box>
            <Box css={{ margin: "$4 0" }}>
              <Button
                onClick={() => {
                  size != "" || color != ""
                    ? handleAddProductToCart &&
                      handleAddProductToCart(product as any)
                    : null;
                }}
                variant={size != "" || color != "" ? "addToCart" : "fillProps"}
              >
                Add to cart
              </Button>
            </Box>
            <Box>
              <p>{description}</p>
            </Box>
          </Flex>
        </Flex>
      </Section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await client.query<Product>({
    query: gql`
      query ($id: String!) {
        product(id: $id) {
          name
          gallery
          description
          inStock
          category
          brand
          prices {
            currency
            amount
          }
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
        }
      }
    `,
    variables: {
      id: params && params.id,
    },
  });

  const product = data.product;

  if (!product.inStock) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};
