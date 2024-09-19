import CartActions from "@/main/Components/Cart/cart-item/cart-actions/CartActions";
import Heading from "@/main/UI/Heading";
import { TOrderForm } from "@/types/TOrder";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useCart } from "@hooks/useCart";
import { useProfile } from "@hooks/useProfile";
import { Button, Card, CardBody, Divider, Input } from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { items, total } = useCart();
  const {
    profile: { first_name, phone_number, town },
  } = useProfile();
  const { createOrder } = useActions();
  const { isLoading } = useAppSelector((state) => state.orders);

  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
  });
  const [deliveryPrice, setDeliveryPrice] = useState(800);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (total > 10000) {
      setDeliveryPrice(0);
    }
  }, [total]);

  const grandTotal = total + deliveryPrice;

  const { handleSubmit, control } = useForm<TOrderForm>();

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
      navigate("/profile");
    } else {
      toast.error("Ошибка создания заказа");
    }
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 py-8">
      <Heading className="text-center">Оформление заказа</Heading>
      {items.length === 0 ? (
        <div className="text-center mt-8 text-lg">Корзина пуста!</div>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col mt-8 gap-8">
            {items.map((item) => (
              <Card key={item.uuid} className="w-full shadow-lg">
                <CardBody className="flex flex-col sm:flex-row gap-5 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-5 items-center">
                    <img
                      src={item.product.images[0]}
                      className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg"
                      alt={item.product.name}
                    />
                    <div className="text-center sm:text-left">
                      <div className="text-lg font-semibold">
                        {item.product.name}
                      </div>
                      {item.product.description && (
                        <div className="text-sm text-gray-500">
                          {item.product.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <CartActions item={item} />
                  <div className="text-center sm:text-right">
                    {item.discount > 0 ? (
                      <>
                        <span className="text-lg font-semibold text-red-600 mr-2">
                          {convertPrice(item.price)}
                        </span>
                        <span className="text-sm line-through text-gray-500">
                          {convertPrice(item.product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold">
                        {convertPrice(item.price)}
                      </span>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
            <Divider />
            <Card className="shadow-lg">
              <CardBody className="flex flex-col gap-6">
                <Heading className="text-center sm:text-left">
                  Адрес доставки
                </Heading>

                <Input
                  label="ФИО"
                  placeholder="Введите ваше ФИО"
                  name="fullName"
                  value={first_name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <Input
                  label="Номер телефона"
                  placeholder="+7 (___) ___-__-__"
                  name="phone"
                  value={phone_number}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <Controller
                  control={control}
                  name="addressLine1"
                  render={({ field: { onChange, value } }) => (
                    <Input
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
                <Controller
                  control={control}
                  name="addressLine2"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Адрес (дополнительно)"
                      placeholder="Дополнительная информация"
                      name="addressLine2"
                      value={value}
                      onChange={onChange}
                      fullWidth
                    />
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-6">
                  <Input
                    label="Город"
                    placeholder="Введите город"
                    name="city"
                    value={town}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <Controller
                    control={control}
                    name="postalCode"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Почтовый индекс"
                        placeholder="Введите почтовый индекс"
                        name="postalCode"
                        value={value}
                        onChange={onChange}
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
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
              className="mt-4"
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
