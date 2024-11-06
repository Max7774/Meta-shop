import { unitofmeasurementData } from "@/const/unitofmeasurement";
import { convertPrice } from "@utils/convertPrice";

interface IPriceProps {
  discount: number;
  price: number;
  unitofmeasurement: string;
}

const Price = ({ discount, price, unitofmeasurement }: IPriceProps) => {
  return (
    <div className="flex items-center gap-2">
      {discount > 0 ? (
        <div className="flex flex-col flex-wrap gap-2">
          <span className="text-[15px] font-semibold text-red-600">
            {convertPrice(price - (price * discount) / 100)}
            <span className="text-[15px] pl-2 text-default-400">
              / {unitofmeasurementData[unitofmeasurement]}
            </span>
          </span>
          <span className="text-[15px] line-through text-gray-500">
            {convertPrice(price)}
          </span>
        </div>
      ) : (
        <div className="flex flex-col flex-wrap gap-2">
          <span className="text-[15px] font-semibold">
            {convertPrice(price)}
            <span className="text-[15px] pl-2 text-default-400">
              / {unitofmeasurementData[unitofmeasurement]}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Price;
