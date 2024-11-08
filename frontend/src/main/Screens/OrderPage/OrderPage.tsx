/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/main/UI/Heading";
import { TOrderForm } from "@/types/TOrder";
import Address from "@Components/Address/Address";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useCart } from "@hooks/useCart";
import { Button, Divider, Progress, Textarea } from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderCard from "./OrderCard/OrderCard";

const OrderPage = () => {
  const { items, total } = useCart();
  const {
    profile: { currentAddress },
  } = useAppSelector((state) => state.user);
  const { companies } = useAppSelector((state) => state.company);
  const { selectedCompanyProduct } = useAppSelector((state) => state.products);

  const { createOrder, reset, updateItemsInStock, getAllCompanies } =
    useActions();
  const { isLoading } = useAppSelector((state) => state.orders);
  const [itemsInStock, setInStock] = useState<any>([
    ...items.filter((el) => !el.inStock),
  ]);
  const navigate = useNavigate();

  const companyDeliveryPrice = companies.find(
    (item) => item.uuid === selectedCompanyProduct
  )?.deliveryPrice;
  const companyMinPriceDelivery = companies.find(
    (item) => item.uuid === selectedCompanyProduct
  )?.minimumOrderPrice;

  const deliveryPrice = companyDeliveryPrice || 600;
  const minPriceDelivery = companyMinPriceDelivery || 7000;

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
          inStock: item.inStock,
        };
      }),
    });
    if (result.type === "/order/create/fulfilled") {
      reset();
      navigate("/orders");
    } else {
      setInStock(result.payload.itemsInStock);
      updateItemsInStock({
        itemsInStock: result.payload.itemsInStock,
      });

      toast.error("Ошибка создания заказа");
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

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
          <div className="flex flex-col mt-4 gap-3">
            {items.map((item, index) => (
              <OrderCard
                item={item}
                key={item.uuid + index}
                itemsInStock={itemsInStock}
              />
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
                <div>{convertPrice(deliveryPrice)}</div>
              </div>
              {minPriceDelivery !== 0 && (
                <Progress
                  aria-label="Loading..."
                  label={
                    total >= 7000
                      ? "Можно заказаывать"
                      : `Ещё необходимо: ${convertPrice(
                          minPriceDelivery - total
                        )}`
                  }
                  color={total >= 7000 ? "success" : "warning"}
                  maxValue={minPriceDelivery}
                  value={total}
                />
              )}
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
              isDisabled={minPriceDelivery >= grandTotal}
              size="lg"
            >
              {isLoading ? "Оформляем..." : "Оформить заказ"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default OrderPage;
