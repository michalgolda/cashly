export const defaultDateTimeFormat = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

export const defaultCurrencyFormat = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
});
  