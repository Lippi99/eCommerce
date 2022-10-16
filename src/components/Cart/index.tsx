import { Box } from "../Box";
import { useCart } from "../context/cartContext";
import { Flex } from "../Flex";
import NextImage from "next/image";
import { currencySign } from "../../utils/currency";

export const Cart = () => {
  const { productsCart } = useCart();

  let total = 0;
  let currency = "";

  productsCart.forEach((value) => {
    const amount = value.prices.filter(
      (price) => price.currency === value.currency
    );
    for (let i = 0; i < amount.length; i++) {
      total += amount[i].amount!;
      currency = currencySign(value.currency)!;
    }
  });

  return (
    <Flex
      direction="column"
      justify="between"
      css={{
        width: 380,
        overflowY: "auto",
        padding: "$3",
        position: "absolute",
        right: "63px",
        boxShadow: "1px 1px 11px -2px #000000",
        backgroundColor: "rgba(255, 255, 255, 1)",
        zIndex: 100,
      }}
    >
      <Box
        css={{
          width: "100%",
          height: 500,
          overflowY: "auto",
        }}
      >
        <Box css={{ paddingBottom: "$6" }}>
          <span>
            <b> MyBag, </b>
            {productsCart && productsCart.length > 1
              ? `${productsCart.length} Items`
              : `${productsCart && productsCart.length} Item`}
          </span>
        </Box>
        {productsCart ? (
          productsCart.map((product) => {
            const amount = product.prices.filter(
              (price) => price.currency === product.currency
            );

            return (
              <>
                <Flex justify="between" key={product.id}>
                  <Box>
                    <p style={{ marginBottom: "1rem" }}>{product.id}</p>
                    <p style={{ marginBottom: "1rem", fontWeight: 1000 }}>
                      {currencySign(product.currency)} {amount[0].amount}
                    </p>
                    {product.size.includes("T") ||
                    product.size.includes("G") ? (
                      <>
                        <p>Capacity:</p>
                        <Box
                          css={{
                            width: "63px",
                            height: "45px",
                            cursor: "pointer",
                            color: "white",
                            border: "1px solid $darkGray",
                            marginTop: "$2",
                            marginBottom: "$2",
                            backgroundColor: "$darkGray",
                            marginRight: "$2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {product.size}
                        </Box>
                      </>
                    ) : (
                      <>
                        <p>Size:</p>
                        <Box
                          css={{
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
                          }}
                        >
                          {product.size}
                        </Box>
                      </>
                    )}
                    {product.color ? (
                      <>
                        <p>Color:</p>
                        <Box
                          css={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            color: "white",
                            border: `1px solid ${product.color}`,
                            backgroundColor: `${product.color}`,
                            marginRight: "$2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </>
                    ) : null}
                    {/* <ProductSize value={product.size} /> */}
                  </Box>
                  <Box>
                    <NextImage
                      alt={product.category}
                      width={170}
                      height={200}
                      objectFit="contain"
                      src={product.gallery[0]}
                    />
                  </Box>
                </Flex>
              </>
            );
          })
        ) : (
          <span>vazio</span>
        )}
        <Flex justify="between" css={{ marginTop: "1rem" }}>
          <span style={{ fontWeight: 1000 }}>Total:</span>
          <span style={{ fontWeight: 1000 }}>
            {currency}
            {total.toFixed(2)}
          </span>
        </Flex>
      </Box>
    </Flex>
  );
};
