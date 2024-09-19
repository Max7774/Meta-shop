import ChipFilters from "@/main/Components/ChipFilters/ChipFilters";
import Filters from "@/main/Components/Filters/Filters";
import Products from "@/main/Components/Products/Products";
import Heading from "@/main/UI/Heading";
import Loader from "@/main/UI/Loader";
import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import { useProducts } from "@hooks/useProducts";
import { useEffect } from "react";

const MainPage = () => {
  const { products, isLoading } = useProducts();
  const { getProductsAll } = useActions();
  const {
    products: { queryParams },
  } = useFilters();

  useEffect(() => {
    getProductsAll(queryParams);
  }, [queryParams]);

  if (isLoading) return <Loader />;

  return (
    <section>
      <div className="flex flex-row justify-between items-center">
        <Heading>Продукты</Heading>
        <Filters />
      </div>
      {products.length === 0 ? (
        <span className="font-bold">Продуктов нет, но они скоро появятся!</span>
      ) : (
        <>
          <div>
            <ChipFilters />
          </div>
          <Products products={products} />
        </>
      )}
    </section>
  );
};

export default MainPage;
