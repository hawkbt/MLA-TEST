export const formatCurrency = (amount: number = 0, currency: string = "ARS", locale: string = "es-AR"): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
