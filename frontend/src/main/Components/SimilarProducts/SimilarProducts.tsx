import CardUI from "@Components/Card";
import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import { useProducts } from "@hooks/useProducts";
import { CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";

interface ISimilarProductsProps {
  productUuid: string;
}

const SimilarProducts = ({ productUuid }: ISimilarProductsProps) => {
  const { getSimilarProducts } = useActions();
  const {
    products: { queryParams },
  } = useFilters();

  const { similarProducts, isSimilarLoading, selectedCompanyProduct } =
    useProducts();

  useEffect(() => {
    if (productUuid)
      getSimilarProducts({
        uuid: productUuid,
        companyUuid: selectedCompanyProduct,
        filters: queryParams,
      });
  }, [getSimilarProducts, productUuid, queryParams, selectedCompanyProduct]);

  if (isSimilarLoading) return <CircularProgress />;

  if (similarProducts.length === 0)
    return <span>Продуктов нет, но они скоро появятся!</span>;

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
      {similarProducts.map((product) => (
        <CardUI product={product} key={product.uuid} />
      ))}
    </div>
  );
};

export default SimilarProducts;
