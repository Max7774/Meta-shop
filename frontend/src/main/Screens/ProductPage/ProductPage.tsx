import Heading from "@/main/UI/Heading";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chip, CircularProgress } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import { Helmet } from "react-helmet-async";
import Actions from "@Components/BottomActions/Actions/Actions";
import Price from "@UI/Price/Price";
import SwiperUI from "@UI/SwiperUI/SwiperUI";
import { ERoutes } from "@enums/ERoutes";
import { useCategory } from "@hooks/useCategory";
import SimilarProducts from "@Components/SimilarProducts/SimilarProducts";

const ProductPage = () => {
  const { productSlug, categorySlug, subcategorySlug } = useParams();
  const { getProductBySlug, setBreadCrumbs } = useActions();
  const { product, isLoading } = useProducts();
  const { categories } = useCategory();
  const navigate = useNavigate();

  const title = categories
    .find((item) => categorySlug === item.slug)
    ?.subcategory.find(({ slug }) => subcategorySlug === slug)?.name;

  const currentCategory = categories.find(({ slug }) => categorySlug == slug);

  useEffect(() => {
    getProductBySlug(productSlug || "");
  }, [productSlug, getProductBySlug]);

  useEffect(() => {
    setBreadCrumbs({
      path: ERoutes.ROOT,
      title: "Главная",
    });

    setBreadCrumbs({
      path: ERoutes.CATEGORIES_ROOT,
      title: "Категории",
    });
    setBreadCrumbs({
      path: `/categories/${categorySlug}`,
      title: currentCategory?.name || "",
    });
    setBreadCrumbs({
      path: `/categories/${categorySlug}/${subcategorySlug}`,
      title: title || "",
    });
    setBreadCrumbs({
      path: `/product/${productSlug}/${categorySlug}/${subcategorySlug}`,
      title: product?.name || "",
    });
  }, [
    productSlug,
    product?.name,
    setBreadCrumbs,
    categorySlug,
    currentCategory?.name,
    subcategorySlug,
    title,
  ]);

  if (isLoading) {
    return <CircularProgress />;
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
              color="warning"
              className="text-white cursor-pointer"
              onClick={() =>
                navigate(
                  `/categories/${product?.subcategory?.category?.slug}/${product?.subcategory?.slug}`
                )
              }
            >
              {product?.subcategory?.name}
            </Chip>
            <Chip
              size="lg"
              className="text-white"
              color={
                !product?.inStock || !product?.company.length
                  ? "default"
                  : "success"
              }
            >
              {!product?.inStock || !product?.company.length
                ? "Нет в наличии!"
                : "В наличии!"}
            </Chip>
            {product?.isNew ? (
              <Chip size="lg" className="text-white" color="success">
                Новый
              </Chip>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-6 gap-4">
          <div className="mt-4">
            <SwiperUI
              images={product?.images?.map((el) => ({ image: el })) || []}
            />
          </div>
          <div className="relative flex flex-col px-6 sm:pt-6 gap-4">
            <Price
              discount={product?.company[0]?.discount || 0}
              price={product?.company[0]?.price || 0}
              unitofmeasurement={product?.unitofmeasurement || ""}
            />
            <p className="break-words">{product?.description}</p>
            <div className="hidden sm:flex flex-col gap-5">
              <Actions />
            </div>
          </div>
        </div>
        {product?.peculiarities && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Характеристики</h2>
            <p>{product?.peculiarities}</p>
          </div>
        )}
        <div className="mx-6 mt-5">
          <Heading>Похожие продукты</Heading>
          <SimilarProducts productUuid={product?.uuid || ""} />
        </div>
      </section>
    </>
  );
};

export default ProductPage;
