/* eslint-disable @typescript-eslint/no-explicit-any */
import CartActions from "@/main/Components/Cart/cart-item/cart-actions/CartActions";
import Heading from "@/main/UI/Heading";
import { TOrderForm } from "@/types/TOrder";
import Address from "@Components/Address/Address";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useCart } from "@hooks/useCart";
import { Button, Divider, Image, Progress, Textarea } from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { getImageUrl } from "@utils/getImageUrl";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { items, total } = useCart();
  const {
    profile: { currentAddress },
  } = useAppSelector((state) => state.user);
  const { createOrder, reset } = useActions();
  const { isLoading } = useAppSelector((state) => state.orders);
  const [deliveryPrice, setDeliveryPrice] = useState(800);
  const navigate = useNavigate();

  useEffect(() => {
    if (total > 6000) {
      setDeliveryPrice(0);
    } else {
      setDeliveryPrice(800);
    }
  }, [total]);

  const grandTotal = total + deliveryPrice;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TOrderForm>();

  const submit: SubmitHandler<TOrderForm> = async (data) => {
    if (!currentAddress) {
      toast.error("Заполните свой адрес!");
      return;
    }
    const result: any = await createOrder({
      ...data,
      addressUuid: currentAddress,
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
      navigate("/orders");
    } else {
      toast.error("Ошибка создания заказа");
    }
  };

  return (
    <section>
      <Heading>Оформление заказа</Heading>
      <div className="pb-4">
        <Address />
        {errors.addressUuid && (
          <span className="text-danger">{errors.addressUuid.message}</span>
        )}
      </div>
      {items.length === 0 ? (
        <div className="text-center mt-8 text-lg">Корзина пуста!</div>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <Divider />
          <div className="flex flex-col mt-8 gap-8">
            {items.map((item) => (
              <div key={item.uuid} className="flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                  <Image
                    src={getImageUrl(item.product.images[0])}
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
            <Controller
              control={control}
              name="comment"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Textarea
                  label="Комментарий"
                  placeholder="Оставьте комментарий к доставке"
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )}
            />
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
                    : `До бесплатной доставки: ${convertPrice(6000 - total)}`
                }
                color={deliveryPrice === 0 ? "success" : "warning"}
                maxValue={6000}
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
