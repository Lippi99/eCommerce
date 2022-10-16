import { useProductDetails } from "../context/productDetailsContext";
import { Box } from "../Box";
import { css } from "../../../stitches.config";

interface Attribute {
  value: string;
  id: string;
}

export const ProductColor = ({ value, id }: Attribute) => {
  const { color, setColor } = useProductDetails();

  const productColor = css({
    variants: {
      variant: {
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

  return (
    <Box
      key={id}
      onClick={() => setColor(value)}
      className={productColor({
        variant: color === value ? "colorSelected" : "color",
      })}
      css={{ backgroundColor: value }}
    />
  );
};
