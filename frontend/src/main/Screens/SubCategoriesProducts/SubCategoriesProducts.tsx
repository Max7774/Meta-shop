import Products from "@Components/Products/Products";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import { useProducts } from "@hooks/useProducts";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Heading from "@UI/Heading";
import Loader from "@UI/Loader";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

const SubCategoriesProducts = () => {
  const { subcategorySlug, categorySlug } = useParams();
  const { products, isLoading } = useProducts();
  const { getProductBySubCategory } = useActions();
  const { categories } = useCategory();

  useEffect(() => {
    getProductBySubCategory(subcategorySlug || "");
  }, [products?.length, getProductBySubCategory, subcategorySlug]);

  const title = categories
    .find((item) => categorySlug === item.slug)
    ?.subcategory.find(({ slug }) => subcategorySlug === slug)?.name;

  const categoryTitle = categories.find(
    (item) => item.slug === categorySlug
  )?.name;

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
        <Breadcrumbs maxItems={3} radius="full" variant="solid">
          <BreadcrumbItem>
            <Link to={"/"}>{"Главная"}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/categories/${categorySlug}`}>{categoryTitle}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/${categorySlug}/${subcategorySlug}`}>{title}</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
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
