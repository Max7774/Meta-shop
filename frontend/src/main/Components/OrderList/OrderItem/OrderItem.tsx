import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { TOrder } from "@/types/TOrder";
import { getOrderStatusLabel } from "./utils/getOrderStatusLabel";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { EOrder } from "@enums/EOrder";
import { getImageUrl } from "@utils/getImageUrl";

interface OrderItemProps {
  order: TOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { cancelOrder } = useActions();
  const { isCancelOrderLoading } = useAppSelector((state) => state.orders);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <h3 className="text-lg font-semibold">Заказ № {order.orderId}</h3>

          <span className="text-sm text-gray-500">
            {`От ${new Date(order.createdAt).toLocaleDateString()}`}
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <span>
          Адрес: {`${order.address?.street}, ${order.address?.house}`}
        </span>
        <Divider className="mb-2 mt-2" />
        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div key={item.uuid} className="flex space-x-4">
              <Image
                key={item.uuid + i}
                src={getImageUrl(item.product.images[0])}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div
                key={item.productUuid}
                className="flex flex-col justify-between"
              >
                <h4 key={item.productUuid + i} className="font-semibold">
                  {item.product.name}
                </h4>
                <p key={item.createdAt + i}>
                  Количество: {item.quantity} x {item.price}₽
                </p>
              </div>
            </div>
          ))}
        </div>
        <Divider className="mt-2" />
      </CardBody>
      <CardFooter>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between item-enter w-full px-1">
            <Chip
              color={getOrderStatusLabel(order.status).color}
              size="lg"
              className="text-white"
            >
              {getOrderStatusLabel(order.status).status}
            </Chip>
            <span className="font-semibold pt-1">Итого: {order.total}₽</span>
          </div>
          {order.status !== EOrder.Canceled &&
            order.status !== EOrder.Delivered && (
              <Button
                color="danger"
                isLoading={isCancelOrderLoading}
                onClick={() => cancelOrder(order.uuid)}
              >
                Отменить
              </Button>
            )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;
