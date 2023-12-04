import { ProductCard } from "@UI/index";
import { useTypedSelector } from "@hooks/redux-hooks/useTypedSelector";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";

const Products = () => {
  const { getAllProducts } = useActions();
  const products = useTypedSelector((state) => state.products);
  useEffect(() => {
    getAllProducts({ perPage: 4, ratings: "" });
  }, [getAllProducts]);

  return (
    <>
      <div className="text-3xl text-black font-semibold m-5 tablet:text-center">
        Товары
      </div>
      <div className="m-5 grid tablet:grid-cols-2 desktop:grid-cols-4 mobile:grid-cols-1 gap-5">
        {products.products?.map((el, i) => (
          <ProductCard key={i + "block"} product={el} />
        ))}
      </div>
    </>
  );
};

export default Products;
