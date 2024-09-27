import OrderList from "@Components/OrderList/OrderList";
import Heading from "@UI/Heading";

const UserOrders = () => {
  return (
    <section>
      <Heading>Мои заказы</Heading>
      <OrderList />
    </section>
  );
};

export default UserOrders;
