import { Helmet } from "react-helmet-async";
import CategoriesList from "./CategoriesList/CategoriesList";
import cn from "clsx";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import Search from "@Components/Search/Search";
import Filters from "@Components/Filters/Filters";
import ProductsList from "@Components/ProductsList/ProductsList";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Categories = () => {
  const { products } = useAppSelector((state) => state.filters);

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
            <Link to={`/categories`}>Категории</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="my-4 grid grid-cols-6 items-center justify-center">
          <div
            className={cn({
              "col-span-5": products.queryParams.searchTerm,
              "col-span-6": !products.queryParams.searchTerm,
            })}
          >
            <Search pageKey="products" placeholder="Поиск по продуктам..." />
          </div>
          <div className="col-span-1 justify-self-center">
            {products.queryParams.searchTerm && <Filters />}
          </div>
        </div>
        {products.queryParams.searchTerm ? (
          <ProductsList />
        ) : (
          <CategoriesList />
        )}
      </section>
    </>
  );
};

export default Categories;
