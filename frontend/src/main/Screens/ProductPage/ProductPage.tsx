/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/main/UI/Heading";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiShoppingCartFill, RiShoppingCartLine } from "react-icons/ri";
import { Button, Chip } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import Carousel from "@/main/UI/Carousel/Carousel";
import { useCart } from "@hooks/useCart";
import { convertPrice } from "@utils/convertPrice";

const ProductPage = () => {
  const { productSlug } = useParams();
  const { getProductBySlug, removeFromCart, addToCart } = useActions();
  const { product } = useProducts();
  const { items } = useCart();

  console.log(product);

  const currentElement = items.find(
    (cartItem) => cartItem.product.uuid === product?.uuid
  );

  useEffect(() => {
    getProductBySlug(productSlug || "");
  }, []);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <section>
      <Heading>{product.name}</Heading>
      {/* Отображение категории или подкатегории */}
      <Chip>{product.category.name}</Chip>
      <div className="container flex gap-4 flex-col lg:flex-row">
        <Carousel images={product.images} isNew={product.isNew} />
        {/* Информация о продукте */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="text-xl font-semibold text-red-600">
                  {convertPrice(
                    product.price - (product.price * product.discount) / 100
                  )}{" "}
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
          </div>
          <p>{product.description}</p>
          <Button
            color="primary"
            className="w-full"
            onClick={() =>
              currentElement
                ? removeFromCart({ uuid: currentElement.uuid })
                : addToCart({
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
            startContent={
              currentElement ? (
                <RiShoppingCartFill size={25} />
              ) : (
                <RiShoppingCartLine size={25} />
              )
            }
            disabled={!!currentElement}
          >
            {currentElement ? "Добавлено!" : "Добавить в корзину"}
          </Button>
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
  );
};

export default ProductPage;
