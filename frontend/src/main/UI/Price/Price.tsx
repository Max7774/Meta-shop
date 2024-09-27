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
          <span className="text-xl font-semibold text-red-600">
            {convertPrice(price - (price * discount) / 100)}
            <span className="text-sm pl-2 text-default-400">
              / {unitofmeasurementData[unitofmeasurement]}
            </span>
          </span>
          <span className="text-sm line-through text-gray-500">
            {convertPrice(price)}
          </span>
        </div>
      ) : (
        <span className="text-xl font-semibold">{convertPrice(price)}</span>
      )}
    </div>
  );
};

export default Price;
