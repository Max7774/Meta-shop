import { convertPrice } from "@utils/convertPrice";
import { FC } from "react";

const Price: FC<{ discount: number; price: number }> = ({
  price,
  discount,
}) => {
  return (
    <div className="pl-2 flex flex-row items-center">
      {discount === 0 ? (
        <div className="text-xl font-semibold text-red">
          {convertPrice(price)}
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold text-red">
            {convertPrice((price / 100) * (100 - discount))}
          </div>
          <div className="ml-2 line-through text-sm">{convertPrice(price)}</div>
          <div className="ml-2 font-semibold text-red">{`-${discount}%`}</div>
        </>
      )}
    </div>
  );
};

export default Price;
