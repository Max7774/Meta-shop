import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { ERoles } from "@enums/ERoles";

interface IAdminActionsProps {
  productUuid: string;
  productSlug: string;
}

const AdminActions = ({ productUuid, productSlug }: IAdminActionsProps) => {
  const [isOpen, setIsOpen] = useState({ open: false, uuid: "" });
  const { isProductLoading } = useProducts();
  const { deleteProduct } = useActions();
  const navigate = useNavigate();
  const {
    profile: { role },
  } = useAppSelector((state) => state.user);

  return (
    <div className="flex flex-row justify-around">
      <Button
        variant="light"
        onClick={() => setIsOpen({ open: true, uuid: productUuid })}
      >
        <FiTrash size={20} />
      </Button>
      <Button
        variant="light"
        onClick={() => {
          if (role === ERoles.COMPANY) {
            navigate(`/company/product/${productSlug}`);
          } else if (role === ERoles.ADMIN) {
            navigate(`/admin/product/${productSlug}`);
          }
        }}
      >
        <FaRegEdit size={20} />
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

export default AdminActions;
