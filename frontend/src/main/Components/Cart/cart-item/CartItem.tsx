import { FC } from "react";

import CartActions from "./cart-actions/CartActions";
import { Link } from "react-router-dom";
import { ICartItem } from "@store/cart/cart.types";
import { convertPrice } from "@utils/convertPrice";
import { Button, Image } from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { FiTrash } from "react-icons/fi";
import { useActions } from "@hooks/useActions";
import cn from "clsx";

interface IItem {
  item: ICartItem;
}

const CartItem: FC<IItem> = ({ item }) => {
  const { removeFromCart } = useActions();

  console.log(item);

  return (
    <div
      className={cn("flex flex-row items-center gap-3 py-3 px-2 rounded-2xl", {
        "bg-gray-200": !item.inStock,
        "bg-white": item.inStock,
      })}
    >
      <Link
        to={`/product/${item.product?.slug}/${item.product.subcategory.category?.slug}/${item.product.subcategory.slug}`}
      >
        <Image
          src={getImageUrl(item.product.images[0])}
          alt={item.product.name}
          width={50}
          height={50}
          className={`${!item.inStock ? "opacity-50" : ""}`}
        />
      </Link>
      <div style={{ flex: 1 }}>
        <div className={`${!item.inStock ? "text-gray-500" : ""}`}>
          {item.product.name}
        </div>
        {item.discount > 0 ? (
          <>
            <span
              className={`text-md font-semibold mr-2 ${
                !item.inStock ? "text-gray-500" : "text-red-600"
              }`}
            >
              {convertPrice(item.price - (item.price * item.discount) / 100)}
            </span>
            <span
              className={`text-xs line-through ${
                !item.inStock ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {convertPrice(item.price)}
            </span>
          </>
        ) : (
          <span
            className={`text-md font-semibold ${
              !item.inStock ? "text-gray-500" : ""
            }`}
          >
            {convertPrice(item.price)}
          </span>
        )}
      </div>
      {item.inStock ? (
        <CartActions item={item} />
      ) : (
        <Button
          onPress={() => removeFromCart({ uuid: item.uuid })}
          endContent={<FiTrash />}
          color="default"
          className="text-gray-500 border-gray-500"
          variant="bordered"
          size="sm"
        >
          Удалить
        </Button>
      )}
    </div>
  );
};

export default CartItem;
