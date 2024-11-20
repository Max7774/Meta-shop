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
  const { product, selectedCompanyProduct } = useProducts();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentElement = items.find(
    (cartItem) => cartItem.product.uuid === product?.uuid
  );

  const currentProduct = product?.company.find(
    (item) => item.companyUuid === selectedCompanyProduct
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
                onClick={() => {
                  addToCart({
                    product,
                    discount: currentProduct?.discount || 0,
                    quantity: 1,
                    inStock: product.inStock,
                    price:
                      currentProduct?.discount || 0
                        ? currentProduct?.price ||
                          0 -
                            (currentProduct?.price ||
                              0 * (currentProduct?.discount || 0)) /
                              100
                        : currentProduct?.price || 0,
                    uuid: product.uuid,
                    productUuid: product.uuid,
                  });
                }}
                isDisabled={!product.inStock || !product.company.length}
                startContent={<RiShoppingCartLine size={25} />}
              >
                {!product.inStock || !product.company.length
                  ? "Нет в наличии"
                  : "Добавить в корзину"}
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
