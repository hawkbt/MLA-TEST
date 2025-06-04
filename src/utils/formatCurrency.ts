export const formatCurrency = (amount: number = 0, locale: string = "es-AR", currency: string = "ARS"): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
