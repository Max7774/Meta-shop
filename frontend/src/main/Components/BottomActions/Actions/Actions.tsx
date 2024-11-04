import CartActions from "@Components/Cart/cart-item/cart-actions/CartActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useCart } from "@hooks/useCart";
import { useProducts } from "@hooks/useProducts";
import { Button } from "@nextui-org/react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const Actions = () => {
  const { items } = useCart();
  const { addToCart, selectCompanyProduct } = useActions();
  const { product } = useProducts();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedCompanyProduct = useAppSelector(
    (state) => state.products.selectedCompanyProduct
  );

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
                onClick={() => {
                  addToCart({
                    product,
                    discount: selectedCompanyProduct.discount,
                    quantity: 1,
                    inStock: product.inStock,
                    price: selectedCompanyProduct.discount
                      ? selectedCompanyProduct.price -
                        (selectedCompanyProduct.price *
                          selectedCompanyProduct.discount) /
                          100
                      : selectedCompanyProduct.price,
                    uuid: product.uuid,
                    productUuid: product.uuid,
                  });
                  selectCompanyProduct({
                    uuid: selectedCompanyProduct.uuid,
                  });
                }}
                isDisabled={!product.inStock && !!selectedCompanyProduct}
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
