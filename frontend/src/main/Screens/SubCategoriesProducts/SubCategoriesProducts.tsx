import Products from "@Components/Products/Products";
import { ERoutes } from "@enums/ERoutes";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import { useProducts } from "@hooks/useProducts";
import Heading from "@UI/Heading";
import Loader from "@UI/Loader";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";

const SubCategoriesProducts = () => {
  const { subcategorySlug, categorySlug } = useParams();
  const { products, isLoading } = useProducts();
  const { getProductBySubCategory, setBreadCrumbs } = useActions();
  const { categories } = useCategory();
  const { queryParams } = useAppSelector((state) => state.filters.products);

  useEffect(() => {
    getProductBySubCategory({
      slug: subcategorySlug || "",
      filters: queryParams,
    });
  }, [products?.length, getProductBySubCategory, subcategorySlug, queryParams]);

  const title = categories
    .find((item) => categorySlug === item.slug)
    ?.subcategory.find(({ slug }) => subcategorySlug === slug)?.name;

  const currentCategory = categories.find(({ slug }) => categorySlug == slug);

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
  }, [
    setBreadCrumbs,
    categorySlug,
    currentCategory?.name,
    subcategorySlug,
    title,
  ]);

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
            <Heading>{title}</Heading>
            <Products products={products} />
          </>
        )}
      </section>
    </>
  );
};

export default SubCategoriesProducts;
