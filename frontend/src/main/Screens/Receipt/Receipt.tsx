import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import Heading from "@UI/Heading";
import Loader from "@UI/Loader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Table,
  Divider,
  Avatar,
  Spacer,
  CardBody,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  CardFooter,
  CardHeader,
  Chip,
  Button,
} from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import styles from "./Receipt.module.scss";
import { getOrderStatusLabel } from "@utils/getOrderStatusLabel";
import { convertPrice } from "@utils/convertPrice";

const Receipt = () => {
  const { getOrderById } = useActions();
  const { orderId } = useParams();
  const { isLoading, oneOrder, isError } = useAppSelector(
    (state) => state.orders
  );
  const navigate = useNavigate();

  useEffect(() => {
    getOrderById(orderId || "");
  }, [getOrderById, orderId]);

  if (isError)
    return (
      <>
        <Heading>Чека не сущесвует</Heading>
        <Button color="primary" onClick={() => navigate("/")}>
          Вернуться на главную
        </Button>
      </>
    );

  if (isLoading) return <Loader />;

  return (
    <section>
      <Heading>
        <div className="flex flex-row justify-between items-end gap-5">
          <span>Чек</span>
          <span className="font-bold text-lg">№ {orderId}</span>
        </div>
      </Heading>
      <div className={styles.container}>
        <div className={styles.receiptCard}>
          <Card>
            <CardHeader>
              <div className="w-full flex flex-row justify-between">
                <h3>Чек заказа</h3>
                <span className={styles.orderDate}>
                  Дата заказа:{" "}
                  {new Date(oneOrder?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              {/* Информация о пользователе и адрес доставки */}
              <div className={styles.infoSection}>
                <div className={styles.infoColumn}>
                  <h4>Покупатель</h4>
                  <Spacer y={0.5} />
                  <Avatar
                    src={getImageUrl(oneOrder?.user?.avatarPath || "")}
                    size="lg"
                  />
                  <Spacer y={0.5} />
                  <p>
                    {oneOrder?.user?.first_name} {oneOrder?.user?.second_name}
                  </p>
                  <p className={styles.textGray}>
                    {oneOrder?.user?.phone_number}
                  </p>
                </div>
                <div className={styles.infoColumn}>
                  <h4>Адрес доставки</h4>
                  <Spacer y={0.5} />
                  <p>
                    {oneOrder?.address?.street}, {oneOrder?.address?.town}
                  </p>
                </div>
              </div>
              <Divider className="my-5" />
              {/* Таблица товаров */}
              <Table aria-label="Товары в заказе">
                <TableHeader>
                  <TableColumn>Название</TableColumn>
                  <TableColumn>Количество</TableColumn>
                  <TableColumn>Цена</TableColumn>
                  <TableColumn>Сумма</TableColumn>
                </TableHeader>
                <TableBody>
                  {oneOrder?.items?.map((item) => (
                    <TableRow key={item.uuid}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{convertPrice(item.price)}</TableCell>
                      <TableCell>
                        {convertPrice(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex flex-row flex-wrap w-full justify-between items-center gap-3 mt-3">
                <div className="flex flex-row items-center gap-3">
                  <h4>Статус заказа:</h4>
                  <Spacer x={0.5} />
                  <Chip
                    color={getOrderStatusLabel(oneOrder?.status)?.color}
                    size="lg"
                    variant="faded"
                  >
                    {getOrderStatusLabel(oneOrder?.status)?.status}
                  </Chip>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-lg font-bold">
                    {convertPrice(oneOrder?.total)}
                  </span>
                </div>
              </div>
              {/* Комментарий к заказу */}
              {oneOrder?.comment && (
                <>
                  <Divider className="my-2" />
                  <h4>Комментарий к заказу:</h4>
                  <p>{oneOrder?.comment}</p>
                </>
              )}
            </CardBody>
            <Divider />
            <CardFooter>
              <span className={styles.footerText}>Спасибо за ваш заказ!</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Receipt;
