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

  const { deleteOrder } = useActions();

  return (
    <>
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
