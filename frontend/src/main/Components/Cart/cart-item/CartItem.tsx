import { FC } from "react";

import CartActions from "./cart-actions/CartActions";
import { Link } from "react-router-dom";
import { ICartItem } from "@store/cart/cart.types";
import { convertPrice } from "@utils/convertPrice";
import { Image } from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
interface IItem {
  item: ICartItem;
}

const CartItem: FC<IItem> = ({ item }) => {
  return (
    <div className="flex flex-row gap-3 py-3">
      <Link to={`/product/${item.product?.category?.slug}`}>
        <Image
          src={getImageUrl(item.product.images[0])}
          alt={item.product.name}
          width={50}
          height={50}
        />
      </Link>
      <div style={{ flex: 1 }}>
        <div>{item.product.name}</div>
        {item.discount > 0 ? (
          <>
            <span className="text-md font-semibold text-red-600 mr-2">
              {convertPrice(item.price)}
            </span>
            <span className="text-xs line-through text-gray-500">
              {convertPrice(item.product.price)}
            </span>
          </>
        ) : (
          <span className="text-md font-semibold">
            {convertPrice(item.price)}
          </span>
        )}
      </div>
      <CartActions item={item} />
    </div>
  );
};

export default CartItem;
