const formataValores = (lang, currency, valor) =>
  Intl.NumberFormat(lang, {
    style: "currency",
    maximumFractionDigits: 2,
    currency,
  }).format(valor);

export default formataValores;
