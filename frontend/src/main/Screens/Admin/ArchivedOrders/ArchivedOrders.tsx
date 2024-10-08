import Search from "@Components/Search/Search";
import Heading from "@UI/Heading";
import AdminOrderList from "../Orders/AdminOrderList/AdminOrderList";
import { EOrder } from "@enums/EOrder";
import StatusSort from "./StatusSort/StatusSort";
import { useState } from "react";

const ArchivedOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState<EOrder>(EOrder.Canceled);

  return (
    <section>
      <Heading>Архив заказов</Heading>
      <div className="grid grid-cols-10 gap-5 mb-4">
        <div className="col-span-6">
          <Search
            pageKey="order"
            placeholder="Поиск заказов..."
            className="mb-4 w-full"
          />
        </div>
        <div>
          <StatusSort setSelectedStatus={setSelectedStatus} />
        </div>
      </div>
      <AdminOrderList optionQueryStatus={selectedStatus} />
    </section>
  );
};

export default ArchivedOrders;
