import Filters from "@Components/Filters/Filters";
import Products from "@Components/Products/Products";
import Search from "@Components/Search/Search";
import { ERoutes } from "@enums/ERoutes";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import { useFilters } from "@hooks/useFilters";
import { useProducts } from "@hooks/useProducts";
import Heading from "@UI/Heading";
import Loader from "@UI/Loader";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import cn from "clsx";
import ProductsList from "@Components/ProductsList/ProductsList";

const SubCategoriesProducts = () => {
  const { subcategorySlug, categorySlug } = useParams();
  const { products, isLoading } = useProducts();
  const { getProductBySubCategory, setBreadCrumbs } = useActions();
  const { categories } = useCategory();
  const { products: productsFilters } = useFilters();

  useEffect(() => {
    getProductBySubCategory(subcategorySlug || "");
  }, [products?.length, getProductBySubCategory, subcategorySlug]);

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
            <div className="my-4 grid grid-cols-6 items-center justify-center">
              <div
                className={cn({
                  "col-span-5": productsFilters.queryParams.searchTerm,
                  "col-span-6": !productsFilters.queryParams.searchTerm,
                })}
              >
                <Search
                  pageKey="products"
                  placeholder="Поиск по продуктам..."
                />
              </div>
              <div className="col-span-1 justify-self-center">
                {productsFilters.queryParams.searchTerm && <Filters />}
              </div>
            </div>
            <Heading>{title}</Heading>
            {productsFilters.queryParams.searchTerm ? (
              <ProductsList />
            ) : (
              <Products products={products} />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default SubCategoriesProducts;
