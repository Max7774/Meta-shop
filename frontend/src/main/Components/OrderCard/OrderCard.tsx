import { TOrder } from "@/types/TOrder";
import { EOrder } from "@enums/EOrder";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { getOrderStatusLabel } from "@utils/getOrderStatusLabel";
import { getNextStatus } from "./utils/getNextStatus";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { getImageUrl } from "@utils/getImageUrl";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { ERoles } from "@enums/ERoles";
import { unitofmeasurementData } from "@/const/unitofmeasurement";
import UploadReceipt from "./UploadReceipt/UploadReceipt";
import ActualizeOrderItem from "./ActualizeOrderItem/ActualizeOrderItem";

interface IOrderCardProps {
  order: TOrder;
}

const OrderCard = ({ order }: IOrderCardProps) => {
  const { isOrderStatusChangeLoading, isCancelOrderLoading } = useAppSelector(
    (state) => state.orders
  );
  const {
    profile: { role },
  } = useAuth();
  const { updateStatus, cancelOrder } = useActions();

  const isAdmin = role === ERoles.ADMIN;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Заказ № {order.orderId}</h3>
            <span className="text-sm text-gray-500">
              От: {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <div className="flex flex-row gap-3 my-2">
              {order.isDelivery && (
                <Chip
                  variant="solid"
                  className="px-1"
                  size="sm"
                  color="secondary"
                >
                  Доставка {convertPrice(800)}
                </Chip>
              )}
              {order.isActual && (
                <Chip
                  variant="solid"
                  className="px-1 text-white"
                  size="sm"
                  color="success"
                >
                  Заказ актуалализирован!
                </Chip>
              )}
            </div>
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
                <div className="px-3 py-2 border border-default rounded-2xl">
                  {order.address?.street + ", " + order.address.house}
                  <p className="pr-2">- Город: {order.address.town}</p>
                  <p className="pr-2">- Улица: {order.address.street}</p>
                  <p className="pr-2">- Дом: {order.address.house}</p>
                  {order.address.apartment && (
                    <p className="pr-2">
                      - Квартира: {order.address.apartment}
                    </p>
                  )}
                  {order.address.entrance && (
                    <p className="pr-2">- Подъезд: {order.address.entrance}</p>
                  )}
                  {order.address.intercom && (
                    <p className="pr-2">- Домофон: {order.address.intercom}</p>
                  )}
                  {order.address.floor && (
                    <p className="pr-2">- Этаж: {order.address.floor}</p>
                  )}
                </div>
              </AccordionItem>
            </Accordion>
            {isAdmin && !!order.user?.phone_number && (
              <>
                <Divider className="mb-4" />
                <h3>Телефон: {order.user?.phone_number}</h3>
              </>
            )}
            <h3>Комментарий: {order.comment ? order.comment : "Отсутсвует"}</h3>
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
                  Количество: {item.quantity} x {convertPrice(item.price)}{" "}
                  <span className="text-[15px] text-default-400">
                    / {unitofmeasurementData[item.product.unitofmeasurement]}
                  </span>
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
                {isAdmin && (
                  <>
                    {!order.isActual ? (
                      <ActualizeOrderItem
                        items={order.items}
                        orderId={order.orderId}
                      />
                    ) : (
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
                        {order.status === EOrder.Pending &&
                          "Подтвердить оплату"}
                        {order.status === EOrder.Payed &&
                          "Отправить в доставку"}
                        {order.status === EOrder.In_Delivery &&
                          "Подтвердить доставку"}
                      </Button>
                    )}
                  </>
                )}
                <Button
                  color="danger"
                  onClick={() => cancelOrder(order.uuid)}
                  isLoading={isCancelOrderLoading}
                >
                  Отменить заказ
                </Button>
              </>
            )}
          {order.status !== EOrder.Canceled &&
            order.status !== EOrder.Pending && (
              <UploadReceipt orderId={order.orderId} isAdmin={isAdmin} />
            )}
          {isAdmin && (
            <Button
              color="danger"
              onClick={() => cancelOrder(order.uuid)}
              isLoading={isCancelOrderLoading}
            >
              Отменить заказ
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
