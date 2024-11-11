import CardUI from "@Components/Card";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import { CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";

interface ISimilarProductsProps {
  productUuid: string;
}

const SimilarProducts = ({ productUuid }: ISimilarProductsProps) => {
  const { getSimilarProducts } = useActions();

  const { similarProducts, isSimilarLoading } = useProducts();

  useEffect(() => {
    getSimilarProducts(productUuid);
  }, [getSimilarProducts, productUuid]);

  if (isSimilarLoading) return <CircularProgress />;

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
      {similarProducts.map((product) => (
        <CardUI product={product} key={product.uuid} />
      ))}
    </div>
  );
};

export default SimilarProducts;
