import { FC } from "react";

import CartActions from "./cart-actions/CartActions";
import { Link } from "react-router-dom";
import { ICartItem } from "@store/cart/cart.types";
import { convertPrice } from "@utils/convertPrice";

interface IItem {
  item: ICartItem;
}

const CartItem: FC<IItem> = ({ item }) => {
  return (
    <div style={{ display: "flex", marginBottom: "1rem" }}>
      <Link to={`/product/${item.product?.category?.slug}`}>
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          width={80}
          height={80}
        />
      </Link>
      <div style={{ marginLeft: "1rem", flex: 1 }}>
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
        <CartActions item={item} />
      </div>
    </div>
  );
};

export default CartItem;
