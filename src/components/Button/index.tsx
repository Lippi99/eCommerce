import { css, styled } from "../../../stitches.config";

export const Button = styled("button", {
  variants: {
    variant: {
      addToCart: {
        width: "292px",
        height: "52px",
        backgroundColor: "$lightGreen",
        color: "white",
        fontFamily: `Raleway,sans-serif`,
        textTransform: "uppercase",
        border: "none",
        cursor: "pointer",
      },
    },
  },
});
