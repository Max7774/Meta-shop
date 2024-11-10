import { useCategory } from "@hooks/useCategory";
import { useProducts } from "@hooks/useProducts";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link, useLocation, useParams } from "react-router-dom";
import cn from "clsx";

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { product } = useProducts();
  const { categories } = useCategory();

  const { categorySlug, subcategorySlug, productSlug } = useParams();

  const currentCategory = categories?.find(
    (item) => item?.slug === categorySlug
  );
  const currentSubCategory = currentCategory?.subcategory?.find(
    (el) => el?.slug === subcategorySlug
  );

  const isMainPage = pathname === "/";
  const isCategoryPage = pathname.startsWith("/categories");

  return (
    <Breadcrumbs
      maxItems={3}
      className={cn("mb-2", {
        "mx-6": pathname.startsWith("/product"),
      })}
      radius="full"
      variant="solid"
    >
      {!isMainPage && (
        <BreadcrumbItem>
          <Link to={"/"}>{"Главная"}</Link>
        </BreadcrumbItem>
      )}
      {isCategoryPage && (
        <BreadcrumbItem>
          <Link to={`/categories`}>Категории</Link>
        </BreadcrumbItem>
      )}
      {categorySlug && currentCategory && (
        <BreadcrumbItem>
          <Link to={`/categories/${currentCategory?.slug}`}>
            {currentCategory?.name}
          </Link>
        </BreadcrumbItem>
      )}
      {subcategorySlug && !!currentSubCategory && !!currentCategory && (
        <BreadcrumbItem>
          <Link
            to={`/categories/${currentCategory?.slug}/${currentSubCategory?.slug}`}
          >
            {currentSubCategory?.name}
          </Link>
        </BreadcrumbItem>
      )}
      {product?.uuid && productSlug && (
        <BreadcrumbItem>
          <Link to={`/categories/${product?.subcategory?.category?.slug}`}>
            {product?.subcategory?.category?.name}
          </Link>
        </BreadcrumbItem>
      )}
      {product?.uuid && productSlug && (
        <BreadcrumbItem>
          <Link
            to={`/categories/${product?.subcategory?.category?.slug}/${product?.subcategory?.slug}`}
          >
            {product?.subcategory?.name}
          </Link>
        </BreadcrumbItem>
      )}
      {product?.uuid && productSlug && (
        <BreadcrumbItem>
          <Link to={`/product/${product?.slug}`}>{product?.name}</Link>
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
