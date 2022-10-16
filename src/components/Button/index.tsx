import { styled } from "../../../stitches.config";

export const Button = styled("button", {
  variants: {
    variant: {
      fillProps: {
        width: "292px",
        height: "52px",
        backgroundColor: "#ccc",
        color: "white",
        fontFamily: `Raleway,sans-serif`,
        textTransform: "uppercase",
        border: "none",
        cursor: "not-allowed",
      },
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
