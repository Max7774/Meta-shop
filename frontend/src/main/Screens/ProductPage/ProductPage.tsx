import Heading from "@/main/UI/Heading";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { Button, Chip } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import Carousel from "@/main/UI/Carousel/Carousel";
import { useCart } from "@hooks/useCart";
import { convertPrice } from "@utils/convertPrice";
import CartActions from "@Components/Cart/cart-item/cart-actions/CartActions";
import { unitofmeasurementData } from "@/const/unitofmeasurement";
import { Helmet } from "react-helmet-async";

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
      <section>
        <Heading>{product?.name}</Heading>
        {/* Отображение категории или подкатегории */}
        <Chip>{product?.category?.name}</Chip>
        <div className="container flex gap-4 flex-col lg:flex-row">
          <Carousel
            images={product.images}
            isNew={product.isNew}
            discount={product.discount}
          />
          {/* Информация о продукте */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
              {product.discount > 0 ? (
                <>
                  <span className="text-xl font-semibold text-red-600">
                    {convertPrice(
                      product.price - (product.price * product.discount) / 100
                    )}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    {convertPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold">
                  {convertPrice(product.price)}
                </span>
              )}
              <span className="text-sm text-default-400">
                / {unitofmeasurementData[product.unitofmeasurement]}
              </span>
            </div>
            <p>{product.description}</p>
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
        {/* Дополнительная информация */}
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
