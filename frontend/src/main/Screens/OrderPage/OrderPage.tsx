import CartActions from "@/main/Components/Cart/cart-item/cart-actions/CartActions";
import Heading from "@/main/UI/Heading";
import { TOrderForm } from "@/types/TOrder";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useCart } from "@hooks/useCart";
import { useProfile } from "@hooks/useProfile";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Input,
  Progress,
  Textarea,
} from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { items, total } = useCart();
  const {
    profile: { town },
    isProfileLoading,
  } = useProfile();
  const { createOrder, reset } = useActions();
  const { isLoading } = useAppSelector((state) => state.orders);
  const [deliveryPrice, setDeliveryPrice] = useState(800);
  const navigate = useNavigate();

  useEffect(() => {
    if (total > 10000) {
      setDeliveryPrice(0);
    } else {
      setDeliveryPrice(800);
    }
  }, [total]);

  const grandTotal = total + deliveryPrice;

  const { handleSubmit, control, setValue } = useForm<TOrderForm>();

  const submit: SubmitHandler<TOrderForm> = async (data) => {
    const result: any = await createOrder({
      ...data,
      items: [...items].map((item) => {
        return {
          quantity: item.quantity,
          price: item.price,
          productUuid: item.uuid,
        };
      }),
    });
    if (result.type === "/order/create/fulfilled") {
      reset();
      navigate("/profile");
    } else {
      toast.error("Ошибка создания заказа");
    }
  };

  useEffect(() => {
    if (!isProfileLoading) {
      setValue("town", town);
    }
  }, [isProfileLoading]);

  return (
    <section>
      <Heading>Оформление заказа</Heading>
      {items.length === 0 ? (
        <div className="text-center mt-8 text-lg">Корзина пуста!</div>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <Divider />
          <div className="flex flex-col mt-8 gap-8">
            {items.map((item) => (
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                  <Image
                    src={item.product.images[0]}
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg"
                    alt={item.product.name}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">{item.product.name}</div>
                    <div>
                      {item.discount > 0 ? (
                        <>
                          <span className="text-sm font-semibold text-red-600 mr-2">
                            {convertPrice(item.price)}
                          </span>
                          <span className="text-sm line-through text-gray-500">
                            {convertPrice(item.product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold">
                          {convertPrice(item.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <CartActions item={item} />
              </div>
            ))}
            <Divider />
            <Card className="shadow-lg">
              <CardBody className="flex flex-col gap-6">
                <Heading className="text-center sm:text-left">
                  Адрес доставки
                </Heading>
                <Controller
                  control={control}
                  name="addressLine1"
                  render={({ field: { onChange, value } }) => (
                    <Textarea
                      label="Адрес (улица, дом, квартира)"
                      placeholder="Введите адрес"
                      name="addressLine1"
                      value={value}
                      onChange={onChange}
                      required
                      fullWidth
                    />
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-6">
                  <Controller
                    control={control}
                    name="town"
                    defaultValue={town}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Город"
                        placeholder="Введите город"
                        name="city"
                        value={value}
                        onChange={onChange}
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                <Controller
                  control={control}
                  name="comment"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Textarea
                      label="Комментарий"
                      placeholder="Введите комментарий к доставке"
                      isInvalid={!!error?.message}
                      errorMessage={error?.message}
                      onChange={onChange}
                      value={value}
                      fullWidth
                    />
                  )}
                />
              </CardBody>
            </Card>
            <Divider />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between font-bold text-sm sm:text-lg">
                <div className="text-nowrap">Стоимость товаров:</div>
                <div>{convertPrice(total)}</div>
              </div>
              <div className="flex justify-between font-bold text-sm sm:text-lg">
                <div className="text-nowrap">Стоимость доставки:</div>
                <div>
                  {deliveryPrice === 0 ? (
                    <span className="text-green-600">Бесплатно</span>
                  ) : (
                    convertPrice(deliveryPrice)
                  )}
                </div>
              </div>
              <Progress
                aria-label="Loading..."
                label={
                  deliveryPrice === 0
                    ? "Доставка бесплатная!"
                    : `До бесплатной доставки: ${convertPrice(10000 - total)}`
                }
                color={deliveryPrice === 0 ? "success" : "warning"}
                maxValue={10000}
                value={total}
              />
              <Divider />
              <div className="flex justify-between font-bold text-xl">
                <div>Итого к оплате:</div>
                <div>{convertPrice(grandTotal)}</div>
              </div>
            </div>
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              fullWidth
              size="lg"
            >
              Оформить заказ
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default OrderPage;
