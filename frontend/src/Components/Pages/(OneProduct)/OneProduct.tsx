import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import { Button, Heading } from "@UI/index";
import { RiErrorWarningFill } from "react-icons/ri";
import Price from "./Price/Price";
import { TbTruckDelivery } from "react-icons/tb";
import Reviews from "./Reviews/Reviews";

const OneProduct = () => {
  const { pathname } = useLocation();
  const decodedPathname = decodeURIComponent(pathname);
  const slug = decodedPathname.split("/product/")[1];
  const { getOneProduct } = useActions();
  const product = useAppSelector((state) => state.oneProduct);

  useEffect(() => {
    getOneProduct(slug);
  }, [getOneProduct, slug]);

  return (
    <div>
      <div>
        <Heading className="ml-5 mt-5">{product.name}</Heading>
        <div className="flex flex-col tablet:flex-row justify-between">
          <Carousel images={product.images} isNew={product.isNew} />
          <div className="mt-5 hidden desktop:block w-[500px] p-2">
            <div className="text-xl font-bold">Описание</div>
            <div>{product.description}</div>
            {product.peculiarities !== "" && (
              <>
                <div className="text-xl font-bold my-2">Особенности</div>
                <div className="font-thin">{product.peculiarities}</div>
              </>
            )}
          </div>
          <div className="m-5">
            <div className="shadow-xl rounded-lg p-5  flex flex-col items-start">
              <div className="text-md font-semibold m-2">Цена</div>
              <Price price={product.price} discount={product.discount} />
              {product.discount !== 0 && (
                <div className="flex flex-col tablet:flex-row justify-center items-start tablet:items-center ml-2">
                  <RiErrorWarningFill size={25} className="text-red mr-2" />
                  <div className="text-start text-red">
                    До конца скидки осталось 2 дня
                  </div>
                </div>
              )}
              <div className="flex flex-col items-start">
                <Button variant="primary" size="md">
                  Купить
                </Button>
                <div className="flex flex-row justify-center items-center ml-2">
                  <TbTruckDelivery className=" mr-2" size={25} />
                  <div className="text-center">Доставка от 2 дней</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 m-5 desktop:hidden">
          <div className="text-xl font-bold">Описание</div>
          <div>{product.description}</div>
          <div className="text-xl font-bold my-2">Особенности</div>
          <div>{product.peculiarities}</div>
        </div>
      </div>
      <Reviews reviews={product.reviews} />
    </div>
  );
};

export default OneProduct;
