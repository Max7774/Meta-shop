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
  Input,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { getOrderStatusLabel } from "./utils/getOrderStatusLabel";
import { EOrder } from "@enums/EOrder";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { convertPrice } from "@utils/convertPrice";
import { getImageUrl } from "@utils/getImageUrl";

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
          <Divider />
          <div className="flex flex-col gap-2">
            {!!order.user?.first_name ||
              (!!order.user?.second_name && (
                <h3>
                  Заказал: {order.user?.first_name} {order.user?.second_name}
                </h3>
              ))}
            <Accordion>
              <AccordionItem key="1" aria-label="Адрес" title="Адрес">
                <div className="w-full flex flex-col gap-3">
                  <Input
                    fullWidth
                    readOnly
                    value={order.address.town}
                    label="Город:"
                    labelPlacement="outside"
                    className="justify-between"
                  />
                  <Input
                    fullWidth
                    readOnly
                    value={order.address.street}
                    label="Улица:"
                    labelPlacement="outside"
                    className="justify-between"
                  />
                  <Input
                    fullWidth
                    readOnly
                    value={order.address.house}
                    label="Дом/корпус:"
                    labelPlacement="outside"
                    className="justify-between"
                  />
                  <Input
                    fullWidth
                    readOnly
                    value={order.address.apartment}
                    label="Квартира:"
                    labelPlacement="outside"
                    className="justify-between"
                  />
                  <Input
                    fullWidth
                    readOnly
                    value={order.address.intercom}
                    label="Домофон:"
                    labelPlacement="outside"
                    className="justify-between"
                  />
                  <Input
                    fullWidth
                    readOnly
                    labelPlacement="outside"
                    className="justify-between"
                    label="Подъезд:"
                    value={order.address.entrance}
                  />
                  <Input
                    fullWidth
                    readOnly
                    labelPlacement="outside"
                    className="justify-between"
                    label="Этаж:"
                    value={order.address.floor}
                  />
                </div>
              </AccordionItem>
            </Accordion>
            <Divider className="mb-4" />
            <h3>Телефон: {order.user?.phone_number}</h3>
            {!!order.comment && <h3>Комментарий: {order.comment}</h3>}
            {!!order.user?.first_name && !!order.user?.second_name && (
              <h3>
                ФИО: {order.user?.first_name} {order.user?.second_name}
              </h3>
            )}
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
                src={getImageUrl(item.product.images[0])}
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
                  Количество: {item.quantity} x {convertPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Divider className="mt-2" />
      </CardBody>
      <CardFooter>
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center w-full px-1">
            <Chip
              color={getOrderStatusLabel(order.status).color}
              size="lg"
              variant="faded"
            >
              {getOrderStatusLabel(order.status).status}
            </Chip>
            <span className="font-semibold pt-1">
              Итого: {convertPrice(order.total)}
            </span>
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
