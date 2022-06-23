import { Box } from "../Box";
import { Flex } from "../Flex";
import NextLink from "next/link";
import NextImage from "next/image";
import { css } from "../../../stitches.config";

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
      },
    },
  });

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
              <a className={header({ variant: "link" })}>Women</a>
            </NextLink>
          </li>
          <li className={header({ variant: "item" })}>
            <NextLink href="/">
              <a className={header({ variant: "link" })}>Men</a>
            </NextLink>
          </li>
          <li className={header({ variant: "item" })}>
            <NextLink href="/">
              <a className={header({ variant: "link" })}>Kids</a>
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
