import Heading from "@/main/UI/Heading";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { Button, Chip } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import Carousel from "@/main/UI/Carousel/Carousel";
import { useCart } from "@hooks/useCart";
import CartActions from "@Components/Cart/cart-item/cart-actions/CartActions";
import { Helmet } from "react-helmet-async";
import Price from "@UI/Price/Price";

const ProductPage = () => {
  const { productSlug } = useParams();
  const { getProductBySlug, addToCart } = useActions();
  const { product } = useProducts();
  const { items } = useCart();
  const navigate = useNavigate();

  const currentElement = items.find(
    (cartItem) => cartItem.product.uuid === product?.uuid
  );

  useEffect(() => {
    getProductBySlug(productSlug || "");
  }, [productSlug, getProductBySlug]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Страница продукта</title>
        <meta name="description" content="Страница продукта - AgroZakupKz" />
      </Helmet>
      <section className="w-full">
        <div className="px-6">
          <Heading>{product?.name}</Heading>
          <div className="flex flex-row flex-wrap gap-2">
            <Chip
              size="lg"
              className="cursor-pointer"
              onClick={() => navigate(`/categories/${product?.category?.slug}`)}
            >
              {product?.category?.name}
            </Chip>
            {product?.discount !== 0 && (
              <Chip size="lg" className="text-white" color="danger">
                Скидка {product?.discount}%
              </Chip>
            )}
            {product?.isNew && (
              <Chip size="lg" className="text-white" color="success">
                Новый
              </Chip>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-6 gap-4">
          <Carousel images={product.images} />
          <div className="grid grid-rows-3 px-6 gap-4">
            <Price
              discount={product.discount}
              price={product.price}
              unitofmeasurement={product.unitofmeasurement}
            />
            <p className="text-wrap">{product.description}</p>
            {currentElement ? (
              <>
                <CartActions
                  item={currentElement}
                  className="justify-center bg-default-100 py-1 rounded-xl"
                />
                <Button
                  color="primary"
                  onClick={() => navigate("/order")}
                  size="lg"
                  className="w-full"
                >
                  Оформить заказ
                </Button>
              </>
            ) : (
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
                      ? product.price - (product.price * product.discount) / 100
                      : product.price,
                    uuid: product?.uuid,
                    productUuid: product?.uuid,
                  })
                }
                startContent={<RiShoppingCartLine size={25} />}
              >
                {currentElement ? "Добавлено!" : "Добавить в корзину"}
              </Button>
            )}
          </div>
        </div>
        {product.peculiarities && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Характеристики</h2>
            <p>{product.peculiarities}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductPage;
