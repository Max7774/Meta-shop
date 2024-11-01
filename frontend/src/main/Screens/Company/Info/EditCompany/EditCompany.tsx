import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import EditModal from "./EditModal/EditModal";

const EditCompany = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        className="mt-2 items-center"
        fullWidth
        color="primary"
        onClick={onOpen}
        startContent={<FaRegEdit size={20} />}
      >
        Редактировать
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => <EditModal onClose={onClose} />}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditCompany;
