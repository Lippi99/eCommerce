import { Box } from "../Box";
import { Product, useCart } from "../context/cartContext";
import { Flex } from "../Flex";
import NextImage from "next/image";
import { currencySign } from "../../utils/currency";
import { Button } from "../Button";

export const Cart = () => {
  const { productsCart, handleAddProductToCart, handleRemoveProductToCart } =
    useCart();

  let total = 0;
  let currency = "";
  console.log(productsCart);

  if (Array.isArray(productsCart)) {
    productsCart.forEach((value) => {
      const amount = value.prices.filter(
        (price) => price.currency === value.currency
      );
      for (let i = 0; i < amount.length; i++) {
        const totalCartProducts = amount[i].amount! * value.total!;
        total += totalCartProducts;
        currency = currencySign(value.currency)!;
      }
    });
  }

  const handleIncrementProduct = (product: Product) => {
    handleAddProductToCart && handleAddProductToCart(product);
  };

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
        {Array.isArray(productsCart) ? (
          productsCart.map((product) => {
            return (
              <>
                <Flex justify="between" key={product.id}>
                  <Box css={{ width: "50%", position: "relative" }}>
                    <Flex css={{ width: "100%" }} justify="between">
                      <p style={{ marginBottom: "1rem" }}>{product.name}</p>
                      <Button
                        variant="increment"
                        onClick={() => handleIncrementProduct(product)}
                      >
                        +
                      </Button>
                    </Flex>
                    <p style={{ marginBottom: "1rem", fontWeight: 1000 }}>
                      {currencySign(product.currency)} {product.amount}
                    </p>
                    {product.size?.includes("T") ||
                    product.size?.includes("G") ? (
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
                    <Button
                      css={{ position: "absolute", right: 0, bottom: 0 }}
                      variant="decrement"
                      onClick={() =>
                        handleRemoveProductToCart &&
                        handleRemoveProductToCart(product.name)
                      }
                    >
                      -
                    </Button>
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
