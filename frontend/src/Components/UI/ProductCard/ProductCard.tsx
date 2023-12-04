import { IProduct } from "@interfaces/data-interfaces/product.interface";
import { FC } from "react";
import { Link } from "react-router-dom";
import ProductRating from "./Rating";
import FavoriteButton from "./FavoriteButton/FavoriteButton";
import Price from "./Price/Price";
import AddToCartButton from "./AddToCartButton/AddToCartButton";
import styles from "./ProductCard.module.scss";
import { FaCaretRight } from "react-icons/fa";
import cn from "clsx";

const ProductCard: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <>
      <div className="animate-scaleIn self-end justify-self-end">
        {product.isNew && (
          <>
            <div className={styles["flag"]}>
              <div className={styles["triangle"]}>
                <FaCaretRight size={50} />
              </div>
              <div>Новое!</div>
            </div>
          </>
        )}
        <div className="bg-white rounded-xl relative overflow-hidden shadow-xl">
          <div className="absolute top-2 right-3 z-1">
            <FavoriteButton productUuid={product.uuid} />
            <AddToCartButton product={product} />
          </div>
          <Link to={`/product/${product.slug}`}>
            <img
              width={606}
              height={606}
              src={product.images[0]}
              alt={product.name}
              className="block mx-auto"
            />
          </Link>
        </div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-2 font-semibold pl-2 text-lg">{product.name}</h3>
        </Link>
        <Link
          to={`/category/${product.category.slug}`}
          className="text-aqua pl-2 text-xs mb-2"
        >
          {product.category.name}
        </Link>
        <ProductRating product={product} isText />
        <Price discount={product.discount} price={product.price} />
        <div
          className={cn("text-sm font-semibold pl-2", {
            "text-red": product.quantity <= 10,
          })}
        >{`${product.quantity} шт. ( ${
          product.quantity <= 10 ? "Мало" : "Много"
        } )`}</div>
        <div className="bg-gray h-[1px] mt-3"></div>
      </div>
    </>
  );
};

export default ProductCard;
// <div className="relative top-4 py-1 w-1/3 text-center rounded-lg -left-3 z-1 bg-red px-2 text-white">
