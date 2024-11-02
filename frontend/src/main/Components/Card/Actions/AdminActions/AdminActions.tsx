/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { TProduct } from "@/types/TProduct";
import cn from "clsx";

interface IAdminActionsProps {
  product: TProduct;
}

const AdminActions = ({ product }: IAdminActionsProps) => {
  const [isOpen, setIsOpen] = useState({ open: false, uuid: "" });
  const { isProductLoading } = useProducts();
  const { deleteProduct, recoverProduct } = useActions();
  const navigate = useNavigate();
  const {
    profile: { role, companyUuid },
  } = useAppSelector((state) => state.user);
  const { isProductRecovered } = useAppSelector((state) => state.products);

  const deleteProductHandler = (uuid: string, type: "soft" | "hard") => {
    deleteProduct({ uuid, type, companyUuid });
  };

  console.log(product);

  return (
    <>
      <div className="w-full flex flex-row justify-between gap-1">
        <Button
          variant="ghost"
          isDisabled={
            !!companyUuid &&
            !product.company.some((el) => el.companyUuid === companyUuid)
          }
          onClick={() => setIsOpen({ open: true, uuid: product?.uuid })}
        >
          <FiTrash size={20} />
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            if (role === ERoles.COMPANY) {
              navigate(`/company/product/${product?.slug}`);
            } else if (role === ERoles.ADMIN) {
              navigate(`/admin/product/${product?.slug}`);
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
            <ModalHeader className="flex flex-col gap-1 text-center">
              Вы уверены что хотите удалить товар?
            </ModalHeader>
            <ModalBody>
              {role === ERoles.ADMIN ? (
                <span className="font-bold text-center">
                  К этому товару могут быть привязаны другие продукты в заказах!
                </span>
              ) : (
                <span className="font-bold text-center">
                  Вы удалите свою цену для этого продукта!
                </span>
              )}
            </ModalBody>
            <ModalFooter className="flex flex-col-reverse">
              <Button
                color="primary"
                variant="light"
                size="sm"
                onPress={() => setIsOpen({ open: false, uuid: "" })}
              >
                Закрыть
              </Button>
              <div
                className={cn("grid gap-2 justify-between", {
                  "grid-cols-2": role === ERoles.ADMIN,
                  "grid-cols-1": role !== ERoles.ADMIN,
                })}
              >
                {!product?.isDeleted && (
                  <Button
                    isLoading={isProductLoading}
                    color="warning"
                    fullWidth
                    className="text-white"
                    size="sm"
                    onPress={() => {
                      deleteProductHandler(isOpen.uuid, "soft");
                      setIsOpen({ open: false, uuid: "" });
                    }}
                  >
                    Частичное удаление
                  </Button>
                )}
                {role === ERoles.ADMIN && (
                  <Button
                    isLoading={isProductLoading}
                    color="danger"
                    size="sm"
                    onPress={() => {
                      deleteProductHandler(isOpen.uuid, "hard");
                      setIsOpen({ open: false, uuid: "" });
                    }}
                  >
                    Полное удаление
                  </Button>
                )}
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {product?.isDeleted && (
        <Button
          isLoading={isProductRecovered}
          fullWidth
          color="primary"
          size="sm"
          onClick={async () => {
            const { type }: any = await recoverProduct(product.uuid);
            if (type === "products/recoverProduct/fulfilled")
              navigate(
                `/categories/${product.subcategory.category?.slug}/${product.subcategory.slug}`
              );
          }}
        >
          Восстановить
        </Button>
      )}
    </>
  );
};

export default AdminActions;
