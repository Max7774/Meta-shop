import CartActions from "@Components/Cart/cart-item/cart-actions/CartActions";
import { useActions } from "@hooks/useActions";
import { useCart } from "@hooks/useCart";
import { useProducts } from "@hooks/useProducts";
import { Button } from "@nextui-org/react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const Actions = () => {
  const { items } = useCart();
  const { addToCart } = useActions();
  const { product } = useProducts();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentElement = items.find(
    (cartItem) => cartItem.product.uuid === product?.uuid
  );

  const isProductPage = pathname.startsWith("/product");

  return (
    <>
      <div className="flex flex-col gap-2">
        {isProductPage && !!product && (
          <>
            {currentElement ? (
              <CartActions
                item={currentElement}
                className="justify-center bg-default-100 py-1 rounded-xl"
              />
            ) : (
              <Button
                color={product.inStock ? "primary" : "default"}
                size="lg"
                className="w-full"
                onClick={() =>
                  addToCart({
                    product,
                    discount: product.discount,
                    quantity: 1,
                    inStock: product.inStock,
                    price: product.discount
                      ? product.price - (product.price * product.discount) / 100
                      : product.price,
                    uuid: product.uuid,
                    productUuid: product.uuid,
                  })
                }
                isDisabled={!product.inStock}
                startContent={<RiShoppingCartLine size={25} />}
              >
                {product.inStock ? "Добавить в корзину" : "Нет в наличии"}
              </Button>
            )}
          </>
        )}
        {items.length !== 0 && (
          <Button
            color="primary"
            onClick={() => navigate("/order")}
            size="lg"
            className="w-full"
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </>
  );
};

export default Actions;
