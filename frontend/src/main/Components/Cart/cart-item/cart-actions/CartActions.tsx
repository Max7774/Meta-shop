import { FC } from "react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";

import { useActions } from "@hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@store/cart/cart.types";

const CartActions: FC<{ item: ICartItem }> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useActions();

  const { items } = useCart();

  const quantity = items.find(
    (cartItem) => cartItem.uuid === item.uuid
  )?.quantity;

  return (
    <div className="w-[200px] flex flex-row sm:mt-2 items-center justify-between">
      <div className="flex flex-row items-center">
        <FiMinus
          className="cursor-pointer"
          size={20}
          onClick={() => {
            if ((quantity || 0) > 1) {
              changeQuantity({ uuid: item.uuid, type: "minus" });
            } else {
              removeFromCart({ uuid: item.uuid });
            }
          }}
        />
        <div className="bg-default-200 px-3 py-2 rounded-lg mx-2">
          {quantity}
        </div>
        <FiPlus
          className="cursor-pointer"
          size={20}
          onClick={() => changeQuantity({ uuid: item.uuid, type: "plus" })}
        />
      </div>
      <FiTrash
        className="cursor-pointer"
        size={20}
        onClick={() => removeFromCart({ uuid: item.uuid })}
      />
    </div>
  );
};

export default CartActions;
