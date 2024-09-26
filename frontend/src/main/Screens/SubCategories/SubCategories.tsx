import Products from "@/main/Components/Products/Products";
import Heading from "@/main/UI/Heading";
import Loader from "@/main/UI/Loader";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import { useProducts } from "@hooks/useProducts";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const SubCategories = () => {
  const { categorySlug } = useParams();
  const { products, isLoading } = useProducts();
  const { getProductByCategory } = useActions();
  const { categories } = useCategory();

  useEffect(() => {
    getProductByCategory(categorySlug || "");
  }, [getProductByCategory, categorySlug]);

  const title = categories.find(({ slug }) => categorySlug === slug)?.name;

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Страница категории</title>
        <meta name="description" content="Страница категории - AgroZakupKz" />
      </Helmet>
      <section>
        {products.length === 0 ? (
          <>
            <Heading>{title}</Heading>
            <span>Товаров нет в наличии!</span>
          </>
        ) : (
          <>
            <Heading>{products[0]?.category?.name}</Heading>
            <Products products={products} />
          </>
        )}
      </section>
    </>
  );
};

export default SubCategories;
