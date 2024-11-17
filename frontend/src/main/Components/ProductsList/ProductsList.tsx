import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import { useProducts } from "@hooks/useProducts";
import { useEffect } from "react";
import Products from "@/main/Components/Products/Products";
import ChipFilters from "@/main/Components/ChipFilters/ChipFilters";
import CardSkeleton from "@UI/Skeleton/CardSkeleton/CardSkeleton";

const ProductsList = () => {
  const { products, isLoading } = useProducts();
  const { getProductsAll } = useActions();
  const {
    products: { queryParams },
  } = useFilters();

  // const handleScroll = useCallback(() => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //     document.documentElement.offsetHeight
  //   )
  //     return;

  //   // Загрузите больше продуктов, когда достигнут нижний край
  //   updatePageFilters({
  //     pageKey: "products",
  //     perPage: pageFilters?.perPage || 0 + 10,
  //   });
  // }, [pageFilters?.perPage, updatePageFilters]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  useEffect(() => {
    getProductsAll(queryParams);
  }, [queryParams, getProductsAll]);

  if (isLoading) return <CardSkeleton />;

  return (
    <>
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
    </>
  );
};

export default ProductsList;
