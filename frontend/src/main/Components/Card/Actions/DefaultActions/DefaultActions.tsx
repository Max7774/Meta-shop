import { TProduct } from "@/types/TProduct";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
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

  const selectedCompanyProduct = useAppSelector(
    (state) => state.products.selectedCompanyProduct
  );

  const currentItem = items.find((el) => el.product.uuid === product.uuid);

  if (!product.inStock || !product.company.length)
    return (
      <Button color="default" fullWidth isDisabled>
        Нет в наличии
      </Button>
    );

  return (
    <>
      {!!currentItem && currentItem.quantity >= 1 ? (
        <div className="w-full flex flex-row justify-around items-center">
          <FiMinus
            className="cursor-pointer"
            size={20}
            onClick={() => {
              if (currentItem.quantity || 0 > 1) {
                changeQuantity({ uuid: currentItem.uuid, type: "minus" });
              } else {
                removeFromCart({ uuid: currentItem.uuid });
              }
            }}
          />
          <div className="bg-default-200 px-3 py-2 rounded-lg mx-2">
            {currentItem.quantity}
          </div>
          <FiPlus
            className="cursor-pointer"
            size={20}
            onClick={() =>
              changeQuantity({ uuid: currentItem.uuid, type: "plus" })
            }
          />
        </div>
      ) : (
        <Button
          size="sm"
          color="primary"
          fullWidth
          onClick={() =>
            addToCart({
              product,
              inStock: product.inStock,
              discount: selectedCompanyProduct.discount,
              quantity: 1,
              price: selectedCompanyProduct.discount
                ? selectedCompanyProduct.price -
                  (selectedCompanyProduct.price *
                    selectedCompanyProduct.discount) /
                    100
                : selectedCompanyProduct.price,
              uuid: product?.uuid,
              productUuid: product?.uuid,
              selectedCompanyProduct,
            })
          }
        >
          В корзину
        </Button>
      )}
    </>
  );
};

export default DefaultActions;
