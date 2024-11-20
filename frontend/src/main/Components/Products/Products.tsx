import { TProduct } from "@/types/TProduct";
import CardUI from "../Card";
import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import { useProducts } from "@hooks/useProducts";
import { Button } from "@nextui-org/react";

interface IProductsProps {
  products: TProduct[];
}

const Products = ({ products }: IProductsProps) => {
  const { updatePageFilters } = useActions();
  const { length, isLoading } = useProducts();
  const {
    products: { pageFilters, isFilterUpdated },
  } = useFilters();

  if (products.length === 0) return <div>Продуктов нет...</div>;

  return (
    <section>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
        {products.map((item) => (
          <CardUI product={item} key={item.uuid} />
        ))}
      </div>
      {products.length !== length && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() =>
              updatePageFilters({
                pageKey: "products",
                ...pageFilters,
                perPage: pageFilters.perPage + 10,
              })
            }
            isLoading={isLoading && isFilterUpdated}
            color="primary"
            variant="faded"
          >
            Загрузить ещё
          </Button>
        </div>
      )}
    </section>
  );
};

export default Products;
