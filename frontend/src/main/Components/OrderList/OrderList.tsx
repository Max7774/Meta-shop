import React, { useEffect } from "react";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import Loader from "@/main/UI/Loader";
import OrderCard from "@Components/OrderCard/OrderCard";

const OrderList: React.FC = () => {
  const { getAllOrders } = useActions();
  const { isLoading, orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    getAllOrders({ searchTerm: "" });
  }, [getAllOrders]);

  if (isLoading) return <Loader />;

  if (orders.length === 0) {
    return <p>У вас нет заказов.</p>;
  }

  return (
    <div className="space-y-6">
      {orders?.map((order) => (
        <OrderCard key={order.uuid} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
