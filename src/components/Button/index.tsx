import { styled } from "../../../stitches.config";

export const Button = styled("button", {
  variants: {
    variant: {
      increment: {
        maxWidth: 25,
        height: 30,
        width: "100%",
        border: "1px solid $darkGray",
        backgroundColor: "white",
        color: "$darkGray",
        fontFamily: `Raleway,sans-serif`,
        textTransform: "uppercase",
        fontSize: "1.4rem",
        cursor: "pointer",
      },
      decrement: {
        maxWidth: 25,
        height: 30,
        width: "100%",
        border: "1px solid $darkGray",
        backgroundColor: "white",
        color: "$darkGray",
        fontFamily: `Raleway,sans-serif`,
        textTransform: "uppercase",
        fontSize: "1.4rem",
        cursor: "pointer",
      },
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
