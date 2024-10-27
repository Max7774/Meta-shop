import { Helmet } from "react-helmet-async";
import CategoriesList from "./CategoriesList/CategoriesList";
import Search from "@Components/Search/Search";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import ProductsList from "@Components/ProductsList/ProductsList";
import Filters from "@Components/Filters/Filters";
import cn from "clsx";

const MainPage = () => {
  const { products } = useAppSelector((state) => state.filters);

  return (
    <>
      <Helmet>
        <title>Главная</title>
        <meta name="description" content="Главная страница - AgroZakupKz" />
      </Helmet>
      <section>
        <div className="mb-4 grid grid-cols-6 items-center justify-center">
          <div
            className={cn({
              "col-span-5": products.queryParams.searchTerm,
              "col-span-6": !products.queryParams.searchTerm,
            })}
          >
            <Search pageKey="products" />
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

export default MainPage;
