import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { client } from "../../../apollo-client";
import { Box } from "../../components/Box";
import { Flex } from "../../components/Flex";
import { Section } from "../../components/Section";
import NextImage from "next/image";
import { css } from "../../../stitches.config";
import { useState } from "react";
import { Button } from "../../components/Button";

interface Product {
  product: {
    name: string;
    gallery: string[];
    description: string;
    category: string;
    brand: string;
    prices: Price[];
  };
}

interface Price {
  currency: string;
  amount: number;
}

export default function Details({ product }: Product) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

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

  const description = product.description.replace(/(<([^>]+)>)/gi, "");
  return (
    <Section css={{ paddingLeft: "$8", paddingRight: "$8" }}>
      <Flex css={{ maxWidth: "1150px", width: "100%" }} align="start">
        <Flex direction="column">
          {product.gallery
            .map((gallery) => (
              <NextImage
                key={gallery}
                width={150}
                height={150}
                src={gallery}
                objectFit="contain"
              />
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
        <Flex css={{ marginLeft: "$9" }} direction="column" align="start">
          <Box css={{ marginBottom: "$4" }}>
            <h1 className={productDetail({ variant: "title" })}>
              {product.name}
            </h1>
            <p className={productDetail({ variant: "description" })}>
              {product.brand}
            </p>
          </Box>
          <Box css={{ marginBottom: "$4" }}>
            <h2>Size:</h2>
            <Flex>
              <Box
                onClick={() => setSize("XS")}
                className={productDetail({
                  variant: size === "XS" ? "sizeSelected" : "size",
                })}
              >
                XS
              </Box>
              <Box
                onClick={() => setSize("S")}
                className={productDetail({
                  variant: size === "S" ? "sizeSelected" : "size",
                })}
              >
                S
              </Box>
              <Box
                onClick={() => setSize("M")}
                className={productDetail({
                  variant: size === "M" ? "sizeSelected" : "size",
                })}
              >
                M
              </Box>
              <Box
                onClick={() => setSize("L")}
                className={productDetail({
                  variant: size === "L" ? "sizeSelected" : "size",
                })}
              >
                L
              </Box>
            </Flex>
          </Box>
          <Box css={{ marginBottom: "$4" }}>
            <h2 className={productDetail({ variant: "subTitle" })}>Color:</h2>
            <Flex>
              <Box
                onClick={() => setColor("light gray")}
                className={productDetail({
                  variant: color === "light gray" ? "colorSelected" : "color",
                })}
                css={{ backgroundColor: "$lighestGray" }}
              />
              <Box
                onClick={() => setColor("dark gray")}
                className={productDetail({
                  variant: color === "dark gray" ? "colorSelected" : "color",
                })}
                css={{ backgroundColor: "$darkGray" }}
              />
              <Box
                onClick={() => setColor("dark green")}
                className={productDetail({
                  variant: color === "dark green" ? "colorSelected" : "color",
                })}
                css={{ backgroundColor: "$darkGreen" }}
              />
            </Flex>
          </Box>
          <Box>
            <h2
              style={{ marginBottom: "10px" }}
              className={productDetail({ variant: "subTitle" })}
            >
              Price:
            </h2>
            <p className={productDetail({ variant: "subTitle" })}>$50.00</p>
          </Box>
          <Box css={{ margin: "$4 0" }}>
            <Button variant="addToCart">Add to cart</Button>
          </Box>
          <Box>
            <p>{description}</p>
          </Box>
        </Flex>
      </Flex>
    </Section>
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
          category
          brand
          prices {
            currency
            amount
          }
        }
      }
    `,
    variables: {
      id: params?.id,
    },
  });

  const product = data.product;

  return {
    props: {
      product,
    },
  };
};
