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

  const deleteProductHandler = (uuid: string, type: "soft" | "hard") => {
    deleteProduct({ uuid, type });
    navigate(-1);
  };

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
              К этому товару могут быть привязаны другие продукты в заказах!
            </span>
          </ModalBody>
          <ModalFooter className="flex flex-col-reverse">
            <Button
              color="primary"
              size="sm"
              onPress={() => setIsOpen({ open: false, uuid: "" })}
            >
              Закрыть
            </Button>
            <div className="grid grid-cols-2 gap-2 justify-between">
              <Button
                isLoading={isProductLoading}
                color="warning"
                size="sm"
                className="text-white"
                onPress={() => {
                  deleteProductHandler(isOpen.uuid, "soft");
                  setIsOpen({ open: false, uuid: "" });
                }}
              >
                Частичное удаление
              </Button>
              <Button
                isLoading={isProductLoading}
                size="sm"
                color="danger"
                onPress={() => {
                  deleteProductHandler(isOpen.uuid, "hard");
                  setIsOpen({ open: false, uuid: "" });
                }}
              >
                Полное удаление
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteAction;
