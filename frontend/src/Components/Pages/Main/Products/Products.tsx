import { useTypedSelector } from "@hooks/redux-hooks/useTypedSelector";
import { useActions } from "@hooks/useActions";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";

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
        {products.products.map((el, i) => (
          <ProductCard key={i + "block"} product={el} />
        ))}
      </div>
      {/* <div className="bg-gray h-[1px] mx-5"></div> */}
    </>
  );
};

export default Products;
