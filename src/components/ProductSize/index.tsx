import { css } from "../../../stitches.config";
import { Box } from "../Box";
import { useProductDetails } from "../context/productDetailsContext";

interface Attribute {
  value: string;
}

export const ProductSize = ({ value }: Attribute) => {
  const { size, setSize } = useProductDetails();

  const productSize = css({
    variants: {
      variant: {
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
      },
    },
  });

  return (
    <Box
      onClick={() => setSize(value)}
      className={productSize({
        variant: size === value ? "sizeSelected" : "size",
      })}
    >
      {value}
    </Box>
  );
};
