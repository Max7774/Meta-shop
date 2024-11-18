import { TProduct } from "@/types/TProduct";
import { useActions } from "@hooks/useActions";
import { useCart } from "@hooks/useCart";
import { Button } from "@nextui-org/react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface IDefaultActionsProps {
  product: TProduct;
}

const DefaultActions = ({ product }: IDefaultActionsProps) => {
  const { items } = useCart();
  const { addToCart, changeQuantity, removeFromCart } = useActions();

  const companyProduct = product.company[0];

  const currentItem = items.find((el) => el.product.uuid === product.uuid);

  if (!product.inStock || !product.company.length)
    return (
      <Button size="sm" color="default" fullWidth isDisabled>
        Нет в наличии
      </Button>
    );

  return (
    <>
      {!!currentItem && currentItem.quantity >= 1 ? (
        <div className="w-full flex flex-row bg-default-100 rounded-lg justify-around items-center">
          <div
            className="px-4 cursor-pointer"
            onClick={() => {
              if (currentItem.quantity || 0 > 1) {
                changeQuantity({ uuid: currentItem.uuid, type: "minus" });
              } else {
                removeFromCart({ uuid: currentItem.uuid });
              }
            }}
          >
            <FiMinus size={15} />
          </div>
          <div className="h-[32px] w-[32px] text-center text-sm rounded-lg mx-2 flex items-center justify-center">
            {currentItem.quantity}
          </div>
          <div
            className="px-4 cursor-pointer"
            onClick={() =>
              changeQuantity({ uuid: currentItem.uuid, type: "plus" })
            }
          >
            <FiPlus size={15} />
          </div>
        </div>
      ) : (
        <Button
          size="sm"
          color="primary"
          fullWidth
          onClick={() => {
            addToCart({
              product,
              inStock: product.inStock,
              discount: currentItem?.discount || 0,
              quantity: 1,
              price:
                currentItem?.discount || 0
                  ? currentItem?.price ||
                    0 -
                      (currentItem?.price || 0 * (currentItem?.discount || 0)) /
                        100
                  : companyProduct.price || 0,
              uuid: product?.uuid,
              productUuid: product?.uuid,
            });
          }}
        >
          В корзину
        </Button>
      )}
    </>
  );
};

export default DefaultActions;
