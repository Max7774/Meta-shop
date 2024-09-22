import { FC } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

import { useActions } from "@hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@store/cart/cart.types";
import cn from "clsx";

const CartActions: FC<{ item: ICartItem; className?: string }> = ({
  item,
  className,
}) => {
  const { removeFromCart, changeQuantity } = useActions();

  const { items } = useCart();

  const quantity = items.find(
    (cartItem) => cartItem.uuid === item.uuid
  )?.quantity;

  return (
    <div
      className={cn(
        "flex flex-row sm:mt-2 items-center justify-end",
        className
      )}
    >
      <div className="flex w-full flex-row items-center justify-around">
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
    </div>
  );
};

export default CartActions;
