import Search from "@Components/Search/Search";
import Heading from "@UI/Heading";
import { EOrder } from "@enums/EOrder";
import StatusSort from "./StatusSort/StatusSort";
import { useState } from "react";
import AdminOrderList from "@Screens/Admin/Orders/AdminOrderList/AdminOrderList";

const ArchivedOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState<EOrder>(EOrder.Canceled);

  return (
    <section>
      <Heading>Архив заказов</Heading>
      <div className="grid grid-cols-10 gap-1 sm:gap-5 mb-4">
        <div className="sm:col-span-6 col-span-10">
          <Search
            pageKey="order"
            placeholder="Поиск заказов..."
            className="mb-4 w-full"
          />
        </div>
        <div className="sm:col-span-4 col-span-10">
          <StatusSort setSelectedStatus={setSelectedStatus} />
        </div>
      </div>
      <AdminOrderList optionQueryStatus={selectedStatus} />
    </section>
  );
};

export default ArchivedOrders;
