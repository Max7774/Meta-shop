import { TProduct } from "@/types/TProduct";
import { ERoles } from "@enums/ERoles";
import { useProfile } from "@hooks/useProfile";
import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { useNavigate } from "react-router-dom";
import DefaultActions from "./Actions/DefaultActions/DefaultActions";
import AdminActions from "./Actions/AdminActions/AdminActions";

interface ICardProps {
  product: TProduct;
}
const CardUI = ({ product }: ICardProps) => {
  const navigate = useNavigate();
  const {
    profile: { role },
  } = useProfile();

  return (
    <Card shadow="sm" key={product.uuid}>
      <CardBody
        className="overflow-visible p-0 cursor-pointer"
        onClick={() => navigate("/product/" + product.slug)}
      >
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-cover h-[140px]"
          src={product.images[0]}
        />
      </CardBody>
      <CardFooter className="text-small gap-2 flex-col justify-between">
        <b className="text-center">{product.name}</b>
        <p className="text-default-500">
          {product.discount > 0 ? (
            <>
              <span className="text-md font-semibold text-red-600">
                {convertPrice(
                  product.price - (product.price * product.discount) / 100
                )}{" "}
              </span>
              <span className="text-xs line-through text-gray-500">
                {convertPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-md font-semibold">
              {convertPrice(product.price)}
            </span>
          )}
        </p>
        <Divider />
        {role === ERoles.ADMIN ? (
          <AdminActions productUuid={product.uuid} />
        ) : (
          <DefaultActions product={product} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CardUI;
