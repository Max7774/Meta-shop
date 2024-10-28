import Products from "@Components/Products/Products";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import { useProducts } from "@hooks/useProducts";
import Heading from "@UI/Heading";
import Loader from "@UI/Loader";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const SubCategoriesProducts = () => {
  const { subcategorySlug, categorySlug } = useParams();
  const { products, isLoading } = useProducts();
  const { getProductBySubCategory } = useActions();
  const { categories } = useCategory();

  useEffect(() => {
    if (products?.length === 0) getProductBySubCategory(subcategorySlug || "");
  }, [products?.length, getProductBySubCategory, subcategorySlug]);

  const title = categories
    .find((item) => categorySlug === item.slug)
    ?.subcategory.find(({ slug }) => subcategorySlug === slug)?.name;

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Страница продуктов по подкатегории</title>
        <meta
          name="description"
          content="Страница продуктов по подкатегории - AgroZakupKz"
        />
      </Helmet>
      <section>
        {products.length === 0 ? (
          <>
            <Heading>{title}</Heading>
            <span>Товаров нет в наличии!</span>
          </>
        ) : (
          <>
            <Heading>{products[0]?.subcategory?.name}</Heading>
            <Products products={products} />
          </>
        )}
      </section>
    </>
  );
};

export default SubCategoriesProducts;
