import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IDeleteActionProps {
  productUuid: string;
}

const DeleteAction = ({ productUuid }: IDeleteActionProps) => {
  const [isOpen, setIsOpen] = useState({ open: false, uuid: "" });
  const { isProductLoading } = useProducts();
  const { deleteProduct } = useActions();
  const navigate = useNavigate();

  return (
    <div className="my-3">
      <Button
        fullWidth
        color="danger"
        size="lg"
        onClick={() => setIsOpen({ open: true, uuid: productUuid })}
      >
        Удалить продукт
      </Button>
      <Modal
        isOpen={isOpen.open}
        onOpenChange={() => setIsOpen({ open: false, uuid: "" })}
        placement="top"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-warning text-center">
            Вы уверены что хотите удалить товар?
          </ModalHeader>
          <ModalBody>
            <span className="font-bold text-center">
              К этому товару могут быть привязаны другие продукты!
            </span>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onPress={() => setIsOpen({ open: false, uuid: "" })}
            >
              Закрыть
            </Button>
            <Button
              isLoading={isProductLoading}
              color="danger"
              onPress={() => {
                deleteProduct(isOpen.uuid);
                setIsOpen({ open: false, uuid: "" });
                navigate(-1);
              }}
            >
              Применить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteAction;
