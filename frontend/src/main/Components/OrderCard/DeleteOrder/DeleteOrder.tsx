import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

interface IDeleteOrderProps {
  orderId: string;
}

const DeleteOrder = ({ orderId }: IDeleteOrderProps) => {
  const [isOpen, setIsOpen] = useState({ open: false, orderId });

  const { isDeleteLoading } = useAppSelector((state) => state.orders);
  const { deleteOrder } = useActions();

  return (
    <>
      <Button color="danger" onClick={() => setIsOpen({ open: true, orderId })}>
        Удалить заказ
      </Button>
      <Modal
        isOpen={isOpen.open}
        onOpenChange={() => setIsOpen({ open: false, orderId: "" })}
        placement="top"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-warning text-center">
            Вы уверены что хотите удалить заказ?
          </ModalHeader>
          <ModalBody>
            <span className="font-bold text-center">
              Это может оказать влияние на пользователей!
            </span>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onPress={() => setIsOpen({ open: false, orderId: "" })}
            >
              Закрыть
            </Button>
            <Button
              color="danger"
              onPress={() => {
                deleteOrder(isOpen.orderId);
                setIsOpen({ open: false, orderId: "" });
              }}
              isLoading={isDeleteLoading}
            >
              Применить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteOrder;
