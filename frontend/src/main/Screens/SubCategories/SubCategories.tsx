import Loader from "@/main/UI/Loader";
import SubcategoriesList from "@Components/SubcategoriesList/SubcategoriesList";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Heading from "@UI/Heading";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

const SubCategories = () => {
  const { categorySlug } = useParams();
  const { categories, isSubcategoryLoading } = useCategory();
  const { getAllByCategory } = useActions();

  useEffect(() => {
    getAllByCategory(categorySlug || "");
  }, [getAllByCategory, categorySlug]);

  const currentCategory = categories.find(({ slug }) => categorySlug == slug);

  if (isSubcategoryLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Страница категорий</title>
        <meta name="description" content="Страница категорий - AgroZakupKz" />
      </Helmet>
      <section>
        <Breadcrumbs maxItems={3} radius="full" variant="solid">
          <BreadcrumbItem>
            <Link to={"/"}>{"Главная"}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/categories/${categorySlug}`}>
              {currentCategory?.name}
            </Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        {currentCategory && (
          <>
            <Heading>{currentCategory.name}</Heading>
            {currentCategory.subcategory.length === 0 && (
              <span>Продуктов пока что нет, но они обязательно появятся!</span>
            )}
            <SubcategoriesList
              categorySlug={currentCategory.slug}
              subcategories={currentCategory.subcategory}
            />
          </>
        )}
      </section>
    </>
  );
};

export default SubCategories;
