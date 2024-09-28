import { useCart } from "@hooks/useCart";
import { useProducts } from "@hooks/useProducts";
import { convertPrice } from "@utils/convertPrice";
import { MdOutlineDeliveryDining } from "react-icons/md";
import CartActions from "../Cart/cart-item/cart-actions/CartActions";
import { Button, useDisclosure } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActions } from "@hooks/useActions";
import { RiShoppingCartLine } from "react-icons/ri";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";

const BottomActions = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { items } = useCart();
  const { addToCart } = useActions();
  const { product } = useProducts();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentElement = items.find(
    (cartItem) => cartItem.product.uuid === product?.uuid
  );

  return (
    <div className="fixed bottom-0 bg-white z-30 w-full px-4 pt-3 pb-8 shadow-[0px_-7px_22px_1px_rgba(34,60,80,0.29)] rounded-t-3xl sm:hidden">
      <div
        className="flex flex-row gap-2 justify-center pb-6 items-center"
        onClick={onOpen}
      >
        <div>
          <MdOutlineDeliveryDining size={20} />
        </div>
        <span className="text-xs text-center pt-0.5">
          Доставка {convertPrice(0)} - {convertPrice(800)}
        </span>
        <DeliveryInfo
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </div>
      <div>
        <>
          {items.length !== 0 ? (
            <div className="flex flex-col gap-2">
              {currentElement && pathname.startsWith("/product") && (
                <CartActions
                  item={currentElement}
                  className="justify-center bg-default-100 py-1 rounded-xl"
                />
              )}
              <Button
                color="primary"
                onClick={() => navigate("/order")}
                size="lg"
                className="w-full"
              >
                Оформить заказ
              </Button>
            </div>
          ) : (
            <>
              {!!product && pathname.startsWith("/product") && (
                <Button
                  color="primary"
                  size="lg"
                  className="w-full"
                  onClick={() =>
                    addToCart({
                      product,
                      discount: product.discount,
                      quantity: 1,
                      price: product.discount
                        ? product.price -
                          (product?.price * product?.discount) / 100
                        : product.price,
                      uuid: product?.uuid,
                      productUuid: product?.uuid,
                    })
                  }
                  startContent={<RiShoppingCartLine size={25} />}
                >
                  Добавить в корзину
                </Button>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default BottomActions;
