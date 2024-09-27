import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import AdminOrderItem from "./AdminOrderItem/AdminOrderItem";
import { useEffect } from "react";
import Loader from "@UI/Loader";
import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";

const AdminOrderList = () => {
  const { getAllOrders } = useActions();
  const { orders, isLoading } = useAppSelector((state) => state.orders);
  const {
    order: { queryParams },
  } = useFilters();

  useEffect(() => {
    getAllOrders({ searchTerm: queryParams.searchTerm || "" });
  }, [getAllOrders, queryParams]);

  if (isLoading) return <Loader />;

  if (orders.length === 0) {
    return <p>На данный момент нет заказов.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {orders?.map((order) => (
        <AdminOrderItem order={order} />
      ))}
    </div>
  );
};

export default AdminOrderList;
