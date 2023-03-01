import { Box } from "../Box";
import { Flex } from "../Flex";
import NextLink from "next/link";
import NextImage from "next/image";
import { css } from "../../../stitches.config";
import { ChangeEvent, useState } from "react";
import { useCurrency } from "../context/currencyContext";
import { useCart } from "../context/cartContext";
import { Cart } from "../Cart";
import { CurrencyDropdown } from "../CurrencyDropdown";

export const Header = () => {
  const [linkText, setLinkText] = useState("Women");
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const { cartDropDown, setCartDropDown } = useCart();

  const { setCurrency } = useCurrency();
  const { productsCart } = useCart();

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

  return (
    <div style={{ position: "relative" }}>
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
                    variant: `${
                      linkText == "Women" ? "itemAnimation" : "link"
                    }`,
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

        <Box css={{ position: "relative", outline: 0 }}>
          <button
            onClick={() => setCurrencyDropdown((prev) => !prev)}
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            <NextImage
              src="/dollar-icon.svg"
              width={70}
              height={30}
              objectFit="contain"
              alt="currency"
            />
          </button>

          {currencyDropdown && <CurrencyDropdown />}

          <button
            onClick={() =>
              setCartDropDown && setCartDropDown((prev: boolean) => !prev)
            }
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            {productsCart && productsCart.length >= 1 && (
              <Box
                css={{
                  position: "absolute",
                  right: -18,
                  top: -5,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                <span style={{ color: "white" }}>{productsCart.length}</span>
              </Box>
            )}
            <NextImage
              src="/empty-cart-icon.svg"
              width={20}
              height={30}
              objectFit="contain"
              alt="empty cart"
            />
          </button>
        </Box>
      </Flex>
      <Box
        css={{
          width: "100%",
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        {cartDropDown && <Cart />}
      </Box>
    </div>
  );
};
