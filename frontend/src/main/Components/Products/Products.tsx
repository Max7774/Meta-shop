import { TProduct } from "@/types/TProduct";
import CardUI from "../Card";

interface IProductsProps {
  products: TProduct[];
}

const Products = ({ products }: IProductsProps) => {
  
  if (products.length === 0) return <div>Продуктов нет...</div>;

  return (
    <section>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
        {products.map((item) => (
          <CardUI product={item} key={item.uuid} />
        ))}
      </div>
    </section>
  );
};

export default Products;
