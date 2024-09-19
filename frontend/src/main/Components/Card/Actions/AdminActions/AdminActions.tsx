import { Button } from "@nextui-org/react";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";

interface IAdminActionsProps {
  productUuid: string;
}

const AdminActions = ({ productUuid }: IAdminActionsProps) => {
  const { isProductLoading } = useProducts();
  const { deleteProduct } = useActions();

  return (
    <div className="flex flex-row justify-around">
      <Button
        variant="light"
        isLoading={isProductLoading}
        onClick={() => deleteProduct(productUuid)}
      >
        <FiTrash size={20} />
      </Button>
      <Button variant="light">
        <FaRegEdit size={20} />
      </Button>
    </div>
  );
};

export default AdminActions;
