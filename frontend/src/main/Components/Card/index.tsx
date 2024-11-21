import { TProduct } from "@/types/TProduct";
import { ERoles } from "@enums/ERoles";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { useNavigate } from "react-router-dom";
import DefaultActions from "./Actions/DefaultActions/DefaultActions";
import AdminActions from "./Actions/AdminActions/AdminActions";
import { getImageUrl } from "@utils/getImageUrl";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { unitofmeasurementData } from "@/const/unitofmeasurement";

const crudActions = [ERoles.ADMIN, ERoles.COMPANY];

interface ICardProps {
  product: TProduct;
}

const CardUI = ({ product }: ICardProps) => {
  const navigate = useNavigate();
  const {
    profile: { role },
  } = useAppSelector((state) => state.user);

  return (
    <Card shadow="sm" key={product.uuid}>
      <CardBody
        className="overflow-visible p-0 cursor-pointer"
        onClick={() =>
          navigate(
            "/product/" +
              product.slug +
              `/${product.subcategory.category?.slug}/${product.subcategory.slug}`
          )
        }
      >
        <div className="relative">
          <div className="absolute flex flex-row gap-2 z-20 right-2 top-2">
            {product?.isNew ? (
              <Chip size="sm" className="text-white" color="success">
                Новый!
              </Chip>
            ) : (
              <></>
            )}
            {product?.company[0]?.discount !== 0 && product?.company.length ? (
              <Chip color="warning" className="text-white" size="sm">
                Скидка {product?.company[0]?.discount}%
              </Chip>
            ) : (
              <></>
            )}
          </div>
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={product?.name}
            className="w-full object-cover h-[140px]"
            src={getImageUrl(product?.images[0])}
          />
        </div>
      </CardBody>
      <CardFooter className="text-small gap-2 flex-col justify-between">
        <b className="text-center">{product.name}</b>
        <p className="text-default-500">
          {product.company[0]?.discount || 0 > 0 ? (
            <>
              <span className="text-md font-semibold text-red-600">
                {convertPrice(
                  product.company[0]?.price -
                    (product.company[0]?.price * product.company[0]?.discount) /
                      100
                )}{" "}
              </span>
              <span className="text-xs line-through text-gray-500">
                {convertPrice(product.company[0]?.price || 0)}
              </span>
              <span className="text-default-300 font-bold">
                {" "}
                / {unitofmeasurementData[product.unitofmeasurement]}
              </span>
            </>
          ) : (
            <div>
              <span className="text-md font-semibold">
                {convertPrice(product.company[0]?.price || 0)}
              </span>
              <span className="text-default-300 font-bold">
                {" "}
                / {unitofmeasurementData[product.unitofmeasurement]}
              </span>
            </div>
          )}
        </p>
        <Divider />
        {crudActions.includes(role) ? (
          <AdminActions product={product} />
        ) : (
          <DefaultActions product={product} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CardUI;
