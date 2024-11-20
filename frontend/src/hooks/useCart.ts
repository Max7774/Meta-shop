import { useAppSelector } from "./redux-hooks/reduxHooks";

export const useCart = () => {
  const { items } = useAppSelector((state) => state.cart);

  const total = items.reduce((acc, item) => {
    if (item.discount !== 0) {
      return acc + item.price * item.quantity * (1 - item.discount / 100);
    }
    return acc + item.price * item.quantity;
  }, 0);

  return { items, total };
};
