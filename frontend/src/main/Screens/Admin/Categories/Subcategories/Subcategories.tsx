import { TSubCategory } from "@/types/TCategory";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CreateForm from "./CreateForm/CreateForm";
import { useActions } from "@hooks/useActions";

interface ISubcategoriesProps {
  subcategory: TSubCategory[];
  categoryName: string;
  uuid: string;
}

const Subcategories = ({
  subcategory,
  categoryName,
  uuid,
}: ISubcategoriesProps) => {
  const { removeSubCategory } = useActions();
  const [isCreateOpen, setCreateOpen] = useState(false);

  return (
    <>
      {subcategory.length !== 0 && (
        <p className="text-default-400 font-bold py-2">Подкатегории:</p>
      )}
      <div className="flex flex-row flex-wrap gap-4">
        {subcategory.map((item) => (
          <Chip
            key={item.uuid}
            size="lg"
            isCloseable
            variant="flat"
            className="flex items-center"
            onClick={() => removeSubCategory(item.uuid)}
          >
            {item.name}
            <span className="ml-2 cursor-pointer">&times;</span>
          </Chip>
        ))}
      </div>
      <Card
        className="mr-12 sm:mr-32 mt-3 bg-default-200"
        isPressable
        isHoverable
        onPress={() => setCreateOpen(true)}
      >
        <CardBody>
          <div className="flex flex-row justify-start items-center gap-2">
            <FiPlus size={20} />
            <p className="font-bold px-2">Добавить подкатегорию</p>
          </div>
        </CardBody>
      </Card>
      <CreateForm
        open={isCreateOpen}
        close={setCreateOpen}
        categoryName={{ name: categoryName, uuid }}
      />
    </>
  );
};

export default Subcategories;
