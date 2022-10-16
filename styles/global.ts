import { globalCss } from "../stitches.config";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  h1: {
    fontFamily: "Raleway,sans-serif",
  },
  h2: {
    fontFamily: "Raleway,sans-serif",
  },
  p: {
    fontFamily: "Raleway,sans-serif",
  },
  span: {
    fontFamily: "Raleway,sans-serif",
  },
});

() => {
  return globalStyles();
};
