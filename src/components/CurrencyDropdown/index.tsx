import { gql, useQuery } from "@apollo/client";
import { ChangeEvent } from "react";
import { css } from "../../../stitches.config";
import { currencyFormat } from "../../utils";
import { Box } from "../Box";
import { useCurrency } from "../context/currencyContext";
import { Flex } from "../Flex";

interface CurrenciesProps {
  currencies: string[];
}
export const CurrencyDropdown = () => {
  const { setCurrency } = useCurrency();

  const CURRENCY_QUERY = gql`
    query {
      currencies
    }
  `;

  const { data: currencies } = useQuery<CurrenciesProps>(CURRENCY_QUERY);

  const handleSelectCurrency = (event: ChangeEvent<any>) => {
    setCurrency(event.currentTarget.value);
  };

  const currencyCoin = css({
    variants: {
      variant: {
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

  return (
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
      {currencies &&
        currencies.currencies.map((coin, index) => {
          return (
            <Box
              css={{
                "&:hover": {
                  width: "100%",
                  backgroundColor: "lightgray",
                },
              }}
              key={index}
              className={currencyCoin({ variant: "coin" })}
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
  );
};
