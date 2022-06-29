import { Box } from "../Box";
import { Flex } from "../Flex";
import NextLink from "next/link";
import NextImage from "next/image";
import { css } from "../../../stitches.config";
import { ChangeEvent, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { currencyFormat } from "../../utils";
import { useCurrency } from "../context/currencyContext";

const CURRENCY_QUERY = gql`
  query {
    currencies
  }
`;

interface CurrenciesProps {
  currencies: string[];
}

export const Header = () => {
  const [linkText, setLinkText] = useState("Women");
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const { data: currencies } = useQuery<CurrenciesProps>(CURRENCY_QUERY);

  const { currency, setCurrency } = useCurrency();

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
        coin: {
          cursor: "pointer",
          color: "$darkGray",
          fontSize: "$3",
          fontWeight: 500,
          textTransform: "uppercase",
          margin: "$2 0",
          fontFamily: `Raleway,sans-serif`,
        },
      },
    },
  });

  const handleSelectCurrency = (event: ChangeEvent<any>) => {
    setCurrency(event.currentTarget.value);
  };

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

        {currencyDropdown && (
          <Flex
            direction="column"
            css={{
              width: 90,
              textAlign: "center",
              position: "absolute",
              backgroundColor: "transparent",
              zIndex: 100,
            }}
          >
            {currencies?.currencies.map((coin, index) => {
              return (
                <Box
                  css={{
                    "&:hover": {
                      width: "100%",
                      backgroundColor: "lightgray",
                    },
                  }}
                  key={index}
                  className={header({ variant: "coin" })}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={handleSelectCurrency}
                    value={coin}
                  >
                    {currencyFormat(coin)}
                  </button>
                </Box>
              );
            })}
          </Flex>
        )}

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
