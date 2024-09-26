import ProductsList from "./ProductsList/ProductsList";
import Filters from "@/main/Components/Filters/Filters";
import Search from "@Components/Search/Search";
import { Helmet } from "react-helmet-async";

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Главная</title>
        <meta name="description" content="Главная страница - AgroZakupKz" />
      </Helmet>
      <section>
        <div className="flex flex-row justify-between items-center pb-4">
          <Search pageKey="products" className="w-full pr-3" />
          <Filters />
        </div>
        <ProductsList />
      </section>
    </>
  );
};

export default MainPage;
