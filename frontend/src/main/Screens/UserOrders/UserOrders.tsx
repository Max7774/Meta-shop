import OrderList from "@Components/OrderList/OrderList";
import Search from "@Components/Search/Search";
import Heading from "@UI/Heading";

const UserOrders = () => {
  return (
    <section>
      <Heading>Мои заказы</Heading>
      <div className="mb-4">
        <Search pageKey="order" placeholder="Поиск заказов..." />
      </div>
      <OrderList />
    </section>
  );
};

export default UserOrders;
