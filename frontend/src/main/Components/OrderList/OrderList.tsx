import React, { useEffect } from "react";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import Loader from "@/main/UI/Loader";
import OrderCard from "@Components/OrderCard/OrderCard";
import { useFilters } from "@hooks/useFilters";

const OrderList: React.FC = () => {
  const { getAllOrders } = useActions();
  const { isLoading, orders } = useAppSelector((state) => state.orders);
  const {
    order: { queryParams },
  } = useFilters();

  useEffect(() => {
    getAllOrders({ searchTerm: queryParams.searchTerm || "" });
  }, [getAllOrders, queryParams.searchTerm]);

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
