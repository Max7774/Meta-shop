import { TSubCategory } from "@/types/TCategory";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import CreateForm from "./CreateForm/CreateForm";
import { useActions } from "@hooks/useActions";
import { getImageUrl } from "@utils/getImageUrl";

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
          <Card
            shadow="sm"
            key={item.uuid}
            className="sm:h-[200px] sm:w-[200px] h-[200px] w-full"
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                alt={item.uuid}
                className="w-full object-cover h-[140px]"
                src={getImageUrl(item.icon)}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name}</b>
              <Button
                variant="light"
                onClick={() => removeSubCategory(item.uuid)}
              >
                <FiTrash size={20} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button
        startContent={<FiPlus size={20} />}
        color="primary"
        className="mt-4"
        onClick={() => setCreateOpen(true)}
      >
        Добавить подкатегорию
      </Button>
      <CreateForm
        open={isCreateOpen}
        close={setCreateOpen}
        categoryName={{ name: categoryName, uuid }}
      />
    </>
  );
};

export default Subcategories;
