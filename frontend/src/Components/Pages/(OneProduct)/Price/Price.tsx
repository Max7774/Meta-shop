import { convertPrice } from "@utils/convertPrice";
import { FC } from "react";

const Price: FC<{ discount: number; price: number }> = ({
  price,
  discount,
}) => {
  return (
    <div className="pl-2 flex flex-col items-center justify-center">
      {discount === 0 ? (
        <div className="text-xl font-semibold text-black">
          {convertPrice(price)}
        </div>
      ) : (
        <div>
          <div className="text-xl font-semibold text-white text-center bg-green rounded-lg">
            {convertPrice((price / 100) * (100 - discount))}
          </div>
          <div className="flex flex-row items-center">
            <div className="ml-2 line-through text-sm">
              {convertPrice(price)}
            </div>
            <div className="ml-2 font-semibold text-red">{`-${discount}%`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Price;
