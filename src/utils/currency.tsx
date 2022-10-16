const currencyFormat = (currency: string) => {
  if (currency === "USD") {
    return `$ ${currency}`;
  }
  if (currency === "GBP") {
    return `£ ${currency}`;
  }

  if (currency === "AUD") {
    return `A$ ${currency}`;
  }
  if (currency === "JPY") {
    return `¥ ${currency}`;
  }
  if (currency === "RUB") {
    return `₽ ${currency}`;
  }
};

export default currencyFormat;

export const currencySign = (currency: string) => {
  if (currency === "USD") {
    return `$`;
  }
  if (currency === "GBP") {
    return `£`;
  }

  if (currency === "AUD") {
    return `A$`;
  }
  if (currency === "JPY") {
    return `¥`;
  }
  if (currency === "RUB") {
    return `₽`;
  }
};
