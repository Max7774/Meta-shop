import { IProduct } from "@interfaces/data-interfaces/product.interface";
import { FC } from "react";
import { RiShoppingCartLine } from "react-icons/ri";

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
  //   const {} = useActions();
  //   const { items } = useCart();

  //   const currentElement = items.find(
  //     (cartItem) => cartItem.product.id === product.id
  //   );

  return (
    <div>
      <button
        className="text-secondary"
        // onClick={() =>
        //   currentElement
        //     ? removeFromCart({ id: currentElement.id })
        //     : addToCart({
        //         product,
        //         quantity: 1,
        //         price: product.price,
        //       })
        // }
      >
        {/* {currentElement ? <RiShoppingCartFill /> :  */}
        <RiShoppingCartLine size={30} />
      </button>
    </div>
  );
};

export default AddToCartButton;
