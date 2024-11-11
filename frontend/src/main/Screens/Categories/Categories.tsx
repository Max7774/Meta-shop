import { Helmet } from "react-helmet-async";
import CategoriesList from "./CategoriesList/CategoriesList";
import cn from "clsx";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import Search from "@Components/Search/Search";
import Filters from "@Components/Filters/Filters";
import ProductsList from "@Components/ProductsList/ProductsList";
import { ERoutes } from "@enums/ERoutes";
import { useEffect } from "react";
import { useActions } from "@hooks/useActions";

const Categories = () => {
  const { setBreadCrumbs } = useActions();
  const { products } = useAppSelector((state) => state.filters);

  useEffect(() => {
    setBreadCrumbs({
      path: ERoutes.ROOT,
      title: "Главная",
    });
    setBreadCrumbs({
      path: ERoutes.CATEGORIES_ROOT,
      title: "Категории",
    });
  }, [setBreadCrumbs]);

  return (
    <>
      <Helmet>
        <title>Страница категорий</title>
        <meta name="description" content="Страница категорий - AgroZakupKz" />
      </Helmet>
      <section>
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
