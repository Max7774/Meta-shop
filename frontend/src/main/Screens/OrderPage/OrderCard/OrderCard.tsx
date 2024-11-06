/* eslint-disable @typescript-eslint/no-explicit-any */
import CartActions from "@Components/Cart/cart-item/cart-actions/CartActions";
import { useActions } from "@hooks/useActions";
import { Button, Image } from "@nextui-org/react";
import { ICartItem } from "@store/cart/cart.types";
import { getImageUrl } from "@utils/getImageUrl";
import { FiTrash } from "react-icons/fi";
import cn from "clsx";
import Price from "@UI/Price/Price";

interface IOrderCardProps {
  item: ICartItem;
  itemsInStock: any;
}

const OrderCard = ({ item, itemsInStock }: IOrderCardProps) => {
  const { removeFromCart } = useActions();

  const isOutOfStock = itemsInStock.some(
    (el: any) => el.productUuid === item.productUuid
  );

  return (
    <div>
      <div
        key={item.uuid}
        className={cn(
          "flex flex-row justify-between items-center rounded-2xl py-3 px-2",
          {
            "bg-gray-200": isOutOfStock,
            "bg-white": !isOutOfStock,
          }
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <Image
            src={getImageUrl(item.product.images[0])}
            className={cn("w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg", {
              "opacity-50": isOutOfStock,
              "": !isOutOfStock,
            })}
            alt={item.product.name}
          />
          <div className="flex flex-col gap-2">
            <div
              className={cn("text-base font-medium", {
                "text-gray-500": isOutOfStock,
                "text-black": !isOutOfStock,
              })}
            >
              {item.product.name}
            </div>
            <Price
              discount={item.discount}
              price={item.price}
              unitofmeasurement={item.product.unitofmeasurement}
            />
          </div>
        </div>
        {isOutOfStock ? (
          <Button
            onPress={() => removeFromCart({ uuid: item.productUuid })}
            color="default"
            endContent={<FiTrash />}
            className="text-gray-500 border-gray-500"
            variant="bordered"
          >
            Нет в наличии!
          </Button>
        ) : (
          <CartActions item={item} />
        )}
      </div>
    </div>
  );
};

export default OrderCard;
