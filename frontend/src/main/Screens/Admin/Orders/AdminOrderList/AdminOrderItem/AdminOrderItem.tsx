import { TOrder } from "@/types/TOrder";
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
import { getOrderStatusLabel } from "./utils/getOrderStatusLabel";
import { EOrder } from "@enums/EOrder";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";

interface IAdminOrderItemProps {
  order: TOrder;
}

const getNextStatus = (currentStatus: EOrder) => {
  switch (currentStatus) {
    case EOrder.Pending:
      return EOrder.Payed;
    case EOrder.Payed:
      return EOrder.In_Delivery;
    case EOrder.In_Delivery:
      return EOrder.Delivered;
    case EOrder.Delivered:
      return null;
    default:
      return null;
  }
};

const AdminOrderItem = ({ order }: IAdminOrderItemProps) => {
  const { isOrderStatusChangeLoading, isCancelOrderLoading } = useAppSelector(
    (state) => state.orders
  );
  const { updateStatus, cancelOrder } = useActions();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <h3 className="text-lg font-semibold">Заказ № {order.orderId}</h3>
            <span className="text-sm text-gray-500">
              От: {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
          <Divider className="mb-4" />
          <div className="flex flex-col gap-2">
            {!!order.user?.first_name ||
              (!!order.user?.second_name && (
                <h3>
                  Заказал: {order.user?.first_name} {order.user?.second_name}
                </h3>
              ))}
            <h3>Адрес: {order.addressLine1}</h3>
            <h3>Телефон: {order.user?.phone_number}</h3>
            {!!order.comment && <h3>Комментарий: {order.comment}</h3>}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Divider className="mb-2" />
        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div key={item.uuid} className="flex space-x-4">
              <Image
                key={item.uuid + i}
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-16 h-16 object-cover"
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
        <div className="flex flex-col w-full gap-4">
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
              <>
                <Button
                  color="primary"
                  onClick={() => {
                    const nextStatus = getNextStatus(order.status);
                    if (nextStatus) {
                      updateStatus({
                        orderUuid: order.uuid,
                        status: nextStatus,
                      });
                    }
                  }}
                  isLoading={isOrderStatusChangeLoading}
                >
                  {order.status === EOrder.Pending && "Подтвердить оплату"}
                  {order.status === EOrder.Payed && "Отправить в доставку"}
                  {order.status === EOrder.In_Delivery &&
                    "Подтвердить доставку"}
                </Button>
                <Button
                  color="danger"
                  onClick={() => cancelOrder(order.uuid)}
                  isLoading={isCancelOrderLoading}
                >
                  Отменить заказ
                </Button>
              </>
            )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminOrderItem;
