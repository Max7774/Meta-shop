import React, { useEffect } from "react";
import OrderItem from "./OrderItem/OrderItem";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import Loader from "@/main/UI/Loader";

const OrderList: React.FC = () => {
  const { getAllOrders } = useActions();
  const { isLoading, orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    getAllOrders({ searchTerm: "" });
  }, []);

  if (isLoading) return <Loader />;

  if (orders.length === 0) {
    return <p>У вас нет заказов.</p>;
  }

  return (
    <div className="space-y-6">
      {orders?.map((order) => (
        <OrderItem key={order.uuid} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
