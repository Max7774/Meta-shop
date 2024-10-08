import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useEffect } from "react";
import Loader from "@UI/Loader";
import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import OrderCard from "@Components/OrderCard/OrderCard";
import { EOrder } from "@enums/EOrder";

interface IAdminOrderListProps {
  optionQueryStatus?: EOrder;
}

const AdminOrderList = ({ optionQueryStatus }: IAdminOrderListProps) => {
  const { getAllOrders } = useActions();
  const { orders, isLoading } = useAppSelector((state) => state.orders);
  const {
    order: { queryParams },
  } = useFilters();

  useEffect(() => {
    getAllOrders({
      searchTerm: queryParams.searchTerm || "",
      status: optionQueryStatus,
    });
  }, [getAllOrders, queryParams.searchTerm, optionQueryStatus]);

  if (isLoading) return <Loader />;

  if (orders.length === 0) {
    return <p>На данный момент нет заказов.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {orders?.map((order) => (
        <OrderCard order={order} key={order.uuid} />
      ))}
    </div>
  );
};

export default AdminOrderList;
