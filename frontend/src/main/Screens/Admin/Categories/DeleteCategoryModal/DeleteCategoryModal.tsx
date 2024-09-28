import { useActions } from "@hooks/useActions";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface IDeleteCategoryModalProps {
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      uuid: string;
    }>
  >;
  isModalOpen: {
    open: boolean;
    uuid: string;
  };
}

const DeleteCategoryModal = ({
  setIsModalOpen,
  isModalOpen,
}: IDeleteCategoryModalProps) => {
  const { deleteCategory } = useActions();

  return (
    <Modal
      isOpen={isModalOpen.open}
      onOpenChange={() => setIsModalOpen({ open: false, uuid: "" })}
      placement="top"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-warning text-center">
          Вы уверены что хотите удалить категорию?
        </ModalHeader>
        <ModalBody>
          <span className="font-bold text-center">
            К этой категории могут быть привязаны продукты!
          </span>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="light"
            onPress={() => setIsModalOpen({ open: false, uuid: "" })}
          >
            Закрыть
          </Button>
          <Button
            color="danger"
            onPress={() => {
              deleteCategory(isModalOpen.uuid);
              setIsModalOpen({ open: false, uuid: "" });
            }}
          >
            Применить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
