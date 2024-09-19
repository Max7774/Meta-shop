import Heading from "@UI/Heading";
import Search from "@Components/Search/Search";
import AdminOrderList from "./AdminOrderList/AdminOrderList";

const Orders = () => {
  return (
    <section>
      <Heading>Заказы</Heading>
      <Search
        pageKey="order"
        placeholder="Поиск заказов..."
        className="mb-4 w-full"
      />
      <AdminOrderList />
    </section>
  );
};

export default Orders;
