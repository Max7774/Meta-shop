/* eslint-disable @typescript-eslint/no-explicit-any */
import { EOrder } from "@enums/EOrder";
import { getNextStatus } from "../utils/getNextStatus";
import { useActions } from "@hooks/useActions";
import { TOrder } from "@/types/TOrder";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import {
  AddNoteIcon,
  CopyDocumentIcon,
  DeleteDocumentIcon,
  EditDocumentIcon,
} from "./Icons/Icons";
import ActualizeOrderItem from "../ActualizeOrderItem/ActualizeOrderItem";
import DeleteOrder from "../DeleteOrder/DeleteOrder";
import { useState } from "react";
import { toast } from "react-toastify";

interface TActionsProps {
  order: TOrder;
  isAdmin: boolean;
}

const Actions = ({ order, isAdmin }: TActionsProps) => {
  const [isActualOpen, setIsActualOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { updateStatus, cancelOrder } = useActions();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const { getReceiptFile } = useActions();

  const upload = async (orderId: string) => {
    try {
      const response: any = await getReceiptFile(orderId);
      console.log(response);
      const url = window.URL.createObjectURL(
        new Blob([response.payload], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Ошибка при загрузке чека:", error);
      toast.error("Произошла ошибка выгрузки чека");
    }
  };

  const menuItems = [];

  // Добавляем элементы на основе условий
  if (order.status !== EOrder.Canceled && order.status !== EOrder.Delivered) {
    if (isAdmin) {
      if (!order.isActual) {
        menuItems.push(
          <DropdownItem
            key="edit"
            showDivider
            onClick={() => setIsActualOpen(true)}
            description="Изменить кол-во товаров"
            startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Актуализировать цены
          </DropdownItem>
        );
      } else {
        menuItems.push(
          <DropdownItem
            key="updateStatus"
            onClick={() => {
              const nextStatus = getNextStatus(order.status);
              if (nextStatus) {
                updateStatus({
                  orderUuid: order.uuid,
                  status: nextStatus,
                });
              }
            }}
            description="Update order status"
            startContent={<AddNoteIcon className={iconClasses} />}
          >
            {order.status === EOrder.Pending && "Подтвердить оплату"}
            {order.status === EOrder.Payed && "Отправить в доставку"}
            {order.status === EOrder.In_Delivery && "Подтвердить доставку"}
          </DropdownItem>
        );
      }
    }

    menuItems.push(
      <DropdownItem
        key="cancelOrder"
        className="text-danger"
        color="danger"
        description="Отменить заказ"
        onPress={() => cancelOrder(order.uuid)}
        startContent={
          <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
        }
      >
        Отменить заказ
      </DropdownItem>
    );
  }

  if (isAdmin) {
    menuItems.push(
      <DropdownItem
        key="deleteOrder"
        className="text-danger"
        description="Удалить заказ"
        startContent={
          <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
        }
        onPress={() => setIsDeleteOpen(true)}
      >
        Удалить заказ
      </DropdownItem>
    );
  }

  if (order.status !== EOrder.Canceled && order.status !== EOrder.Pending) {
    menuItems.push(
      <DropdownItem
        key="uploadReceipt"
        description="Выгрузить чек о заказе"
        onPress={() => upload(order.orderId)}
        startContent={<CopyDocumentIcon className={iconClasses} />}
      >
        Выгрузить чек
      </DropdownItem>
    );
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="solid" className="text-white" color="warning">
            Действия
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          {menuItems}
        </DropdownMenu>
      </Dropdown>
      <ActualizeOrderItem
        items={order.items}
        orderId={order.orderId}
        isOpen={isActualOpen}
        setIsOpen={setIsActualOpen}
      />
      <DeleteOrder
        orderId={order.orderId}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </>
  );
};

export default Actions;
