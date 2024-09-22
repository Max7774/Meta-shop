import ProductsList from "./ProductsList/ProductsList";
import Filters from "@/main/Components/Filters/Filters";
import Search from "@Components/Search/Search";

const MainPage = () => {
  return (
    <section>
      <div className="flex flex-row justify-between items-center pb-4">
        <Search pageKey="products" className="w-full pr-3" />
        <Filters />
      </div>
      <ProductsList />
    </section>
  );
};

export default MainPage;
