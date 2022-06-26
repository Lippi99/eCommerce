import { Box } from "../Box";
import { Flex } from "../Flex";
import NextLink from "next/link";
import NextImage from "next/image";
import { css } from "../../../stitches.config";
import { useState } from "react";

export const Header = () => {
  const header = css({
    variants: {
      variant: {
        list: {
          display: "flex",
          flexDirection: "row",
        },
        item: {
          listStyleType: "none",
          marginLeft: "$3",
        },
        link: {
          textDecoration: "none",
          color: "$darkGray",
          fontSize: "$3",
          textTransform: "uppercase",
        },
        itemAnimation: {
          color: "$lightGreen",
          paddingBottom: "$2",
          borderBottom: "2px solid $lightGreen",
          textDecoration: "none",
          fontSize: "$3",
          textTransform: "uppercase",
          transition: "all 500ms",
        },
      },
    },
  });

  const [linkText, setLinkText] = useState("Women");

  return (
    <Flex
      css={{ paddingTop: "$4", paddingLeft: "$8", paddingRight: "$8" }}
      as="header"
      justify="between"
      align="center"
      direction="row"
    >
      <Box as="nav">
        <ul className={header({ variant: "list" })}>
          <li className={header({ variant: "item" })}>
            <NextLink href="/">
              <a
                onClick={() => setLinkText("Women")}
                className={header({
                  variant: `${linkText == "Women" ? "itemAnimation" : "link"}`,
                })}
              >
                Women
              </a>
            </NextLink>
          </li>
          <li className={header({ variant: "item" })}>
            <NextLink href="/">
              <a
                onClick={() => setLinkText("Men")}
                className={header({
                  variant: `${linkText == "Men" ? "itemAnimation" : "link"}`,
                })}
              >
                Men
              </a>
            </NextLink>
          </li>
          <li className={header({ variant: "item" })}>
            <NextLink href="/">
              <a
                onClick={() => setLinkText("Kids")}
                className={header({
                  variant: `${linkText == "Kids" ? "itemAnimation" : "link"}`,
                })}
              >
                Kids
              </a>
            </NextLink>
          </li>
        </ul>
      </Box>

      <Box>
        <NextImage
          src="/bag-shop-icon.svg"
          width={40}
          height={30}
          objectFit="contain"
          alt="bag shop"
        />
      </Box>

      <Box>
        <NextImage
          src="/dollar-icon.svg"
          width={70}
          height={30}
          objectFit="contain"
          alt="currency"
        />
        <NextImage
          src="/empty-cart-icon.svg"
          width={20}
          height={30}
          objectFit="contain"
          alt="empty cart"
        />
      </Box>
    </Flex>
  );
};
