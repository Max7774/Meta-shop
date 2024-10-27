import Heading from "@/main/UI/Heading";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chip } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import Carousel from "@/main/UI/Carousel/Carousel";
import { Helmet } from "react-helmet-async";
import Price from "@UI/Price/Price";
import Actions from "@Components/BottomActions/Actions/Actions";

const ProductPage = () => {
  const { productSlug } = useParams();
  const { getProductBySlug } = useActions();
  const { product } = useProducts();
  const navigate = useNavigate();

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
          {product?.company && (
            <span className="text-default-300">
              От фирмы: {product?.company?.name}
            </span>
          )}
          <Heading>{product?.name}</Heading>
          <div className="flex flex-row flex-wrap gap-2">
            <Chip
              size="lg"
              className="cursor-pointer"
              onClick={() =>
                navigate(
                  `/categories/${product?.category?.slug}/${product?.subcategory?.slug}`
                )
              }
            >
              {product?.subcategory?.name}
            </Chip>
            <Chip
              size="lg"
              className="text-white"
              color={product.inStock ? "success" : "danger"}
            >
              {product.inStock ? "В наличии!" : "Нет в наличии!"}
            </Chip>
            {product?.isNew && (
              <Chip size="lg" className="text-white" color="success">
                Новый
              </Chip>
            )}
            {product?.discount !== 0 && (
              <Chip size="lg" className="text-white" color="danger">
                Скидка {product?.discount}%
              </Chip>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-6 gap-4">
          <Carousel images={product.images} />
          <div className="relative flex flex-col px-6 sm:pt-6 gap-4">
            <Price
              discount={product.discount}
              price={product.price}
              unitofmeasurement={product.unitofmeasurement}
            />
            <p className="break-words">{product.description}</p>
            <div className="hidden sm:flex flex-col gap-5">
              <Actions />
            </div>
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
