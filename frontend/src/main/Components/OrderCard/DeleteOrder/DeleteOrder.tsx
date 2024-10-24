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

interface IDeleteOrderProps {
  orderId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const DeleteOrder = ({ orderId, setIsOpen, isOpen }: IDeleteOrderProps) => {
  const { isDeleteLoading } = useAppSelector((state) => state.orders);
  const { deleteOrder } = useActions();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(false)}
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
            onPress={() => setIsOpen(false)}
          >
            Закрыть
          </Button>
          <Button
            color="danger"
            onPress={() => {
              deleteOrder(orderId);
              setIsOpen(false);
            }}
            isLoading={isDeleteLoading}
          >
            Применить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteOrder;
