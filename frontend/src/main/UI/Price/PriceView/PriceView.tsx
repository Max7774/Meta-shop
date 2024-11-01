import { unitofmeasurementData } from "@/const/unitofmeasurement";
import { convertPrice } from "@utils/convertPrice";
import cn from "clsx";

interface IPriceViewProps {
  name: string;
  discount: number;
  price: number;
  unitofmeasurement: string;
}

const PriceView = ({
  name,
  price,
  discount,
  unitofmeasurement,
}: IPriceViewProps) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="text-black">{name}</div>
      <div className="flex flex-col">
        {discount > 0 ? (
          <>
            <span className="flex flex-row gap-1">
              <span
                className={cn("text-small", {
                  "text-red-600": discount > 0,
                  "text-black": discount < 0,
                })}
              >
                {convertPrice(price - (price * discount) / 100)}
              </span>
              <span>/ {unitofmeasurementData[unitofmeasurement]}</span>
            </span>
            <span className="text-tiny text-default-400 line-through">
              {convertPrice(price)}
            </span>
          </>
        ) : (
          <span className="font-semibold">
            {convertPrice(price)} / {unitofmeasurementData[unitofmeasurement]}
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceView;
