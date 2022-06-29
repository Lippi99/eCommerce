import { Flex } from "../Flex";
import NextImage from "next/image";
import { css } from "../../../stitches.config";
import { Prices } from "../../types";
import { Box } from "../Box";
import { useCurrency } from "../context/currencyContext";

interface CardProps {
  src?: any;
  alt?: string;
  title: string;
  prices: Prices[];
}

const text = css({
  variants: {
    variant: {
      title: {
        fontSize: "$3",
        color: "$darkGray",
        fontFamily: `Raleway,sans-serif`,
        fontWeight: 200,
      },
      price: {
        fontFamily: `Raleway,sans-serif`,
        color: "$darkGray",
        fontWeight: 600,
        fontSize: "$3",
      },
    },
  },
});

export const Card = ({ src, alt, title, prices }: CardProps) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Flex direction="column" align="start">
      <NextImage
        width={350}
        height={350}
        src={src}
        alt={alt}
        objectFit="contain"
      />

      <Box css={{ marginLeft: "$8", marginTop: "$4", lineHeight: "20px" }}>
        <h1 className={text({ variant: "title" })}>{title}</h1>
        {prices.map((price, index) => {
          const productValue =
            currency === price.currency && `${currency} ${price.amount}`;
          return (
            <p key={index} className={text({ variant: "price" })}>
              {productValue}
            </p>
          );
        })}
      </Box>
    </Flex>
  );
};
