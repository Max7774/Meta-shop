import { TProduct } from "@/types/TProduct";
import { ERoles } from "@enums/ERoles";
import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { useNavigate } from "react-router-dom";
import DefaultActions from "./Actions/DefaultActions/DefaultActions";
import AdminActions from "./Actions/AdminActions/AdminActions";
import { getImageUrl } from "@utils/getImageUrl";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";

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
        onClick={() => navigate("/product/" + product.slug)}
      >
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product?.name}
          className="w-full object-cover h-[140px]"
          src={getImageUrl(product?.images[0])}
        />
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
            </>
          ) : (
            <span className="text-md font-semibold">
              {convertPrice(product.company[0]?.price || 0)}
            </span>
          )}
        </p>
        <Divider />
        {crudActions.includes(role) ? (
          <>
            <AdminActions
              productUuid={product.uuid}
              productSlug={product.slug}
            />
          </>
        ) : (
          <DefaultActions product={product} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CardUI;
