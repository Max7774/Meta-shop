export const convertPrice = (price: number) => {
  return new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
  }).format(price);
};
