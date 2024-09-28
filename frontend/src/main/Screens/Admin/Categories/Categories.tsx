import Heading from "@/main/UI/Heading";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import { Button, Card, CardBody, Chip, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import DeleteCategoryModal from "./DeleteCategoryModal/DeleteCategoryModal";
import Subcategories from "./Subcategories/Subcategories";
import BlockSkeleton from "@UI/Skeleton/BlockSkeleton/BlockSkeleton";

const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState({ open: false, uuid: "" });
  const { createCategory } = useActions();
  const { categories, isLoading, isDeleteLoading } = useCategory();
  const { control, handleSubmit, reset } = useForm<{ category_name: string }>();

  const submit: SubmitHandler<{ category_name: string }> = (data) => {
    createCategory(data);
    reset();
  };

  if (isLoading) return <BlockSkeleton />;

  return (
    <section>
      <Heading>Создание категории</Heading>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          control={control}
          name="category_name"
          rules={{ required: "Это поле обязательно" }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Название категории"
              label="Название категории"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <div className="my-4">
          <Button isLoading={isLoading} type="submit" color="primary">
            Создать
          </Button>
        </div>
      </form>
      {categories.map(({ name, uuid, subcategory }) => (
        <React.Fragment key={uuid}>
          <Card fullWidth className="mt-4">
            <CardBody>
              <div className="grid grid-cols-3 items-center">
                <p className="font-bold">{name}</p>
                <Chip
                  size="sm"
                  className="text-white justify-self-center"
                  color={subcategory.length === 0 ? "warning" : "success"}
                >
                  {subcategory.length === 0
                    ? "Не отображается"
                    : "Отображается"}
                </Chip>
                <Button
                  variant="light"
                  className="justify-self-end"
                  isLoading={isDeleteLoading}
                  onClick={() => setIsModalOpen({ open: true, uuid })}
                >
                  <FiTrash size={20} />
                </Button>
              </div>
            </CardBody>
          </Card>
          <Subcategories
            subcategory={subcategory}
            categoryName={name}
            uuid={uuid}
          />
        </React.Fragment>
      ))}
      <DeleteCategoryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </section>
  );
};

export default AdminCategories;
