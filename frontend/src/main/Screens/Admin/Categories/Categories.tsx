import Heading from "@/main/UI/Heading";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import DeleteCategoryModal from "./DeleteCategoryModal/DeleteCategoryModal";
import Subcategories from "./Subcategories/Subcategories";
import BlockSkeleton from "@UI/Skeleton/BlockSkeleton/BlockSkeleton";
import { FaRegEdit } from "react-icons/fa";

const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState({ open: false, uuid: "" });
  const [isEditCategory, setIsEditCategory] = useState({
    open: false,
    categoryUuid: "",
  });
  const { createCategory, updateCategory } = useActions();
  const { categories, isLoading, isDeleteLoading, isCategoryEdit } =
    useCategory();
  const { control, handleSubmit, reset } = useForm<{ category_name: string }>();

  const submit: SubmitHandler<{ category_name: string }> = (data) => {
    createCategory(data);
    reset();
  };

  const { handleSubmit: submitEdit, control: editControl } = useForm<{
    category_name: string;
  }>();

  const editCategory: SubmitHandler<{ category_name: string }> = (data) => {
    updateCategory({
      category_name: data.category_name,
      uuid: isEditCategory.categoryUuid,
    });
    setIsEditCategory({ open: false, categoryUuid: "" });
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
          <Button
            className="w-full sm:w-1/4"
            isLoading={isLoading}
            type="submit"
            color="primary"
          >
            Создать
          </Button>
        </div>
      </form>
      {categories?.map(({ name, uuid, subcategory }) => (
        <React.Fragment key={uuid}>
          <Card fullWidth className="mt-4">
            <CardBody>
              {isEditCategory.open && isEditCategory.categoryUuid === uuid ? (
                <form onSubmit={submitEdit(editCategory)}>
                  <Controller
                    control={editControl}
                    name="category_name"
                    defaultValue={name}
                    render={({ field: { onChange, value } }) => (
                      <Input onChange={onChange} value={value} />
                    )}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    className="my-2"
                    size="sm"
                    isLoading={isCategoryEdit}
                    fullWidth
                  >
                    Отредактировать
                  </Button>
                </form>
              ) : (
                <div className="flex flex-row items-center">
                  <p className="text-lg font-bold">{name}</p>
                </div>
              )}
              <div className="grid grid-cols-3 items-center">
                <Chip
                  size="sm"
                  className="text-white justify-self-center"
                  color={subcategory.length === 0 ? "warning" : "success"}
                >
                  {subcategory.length === 0
                    ? "Не отображается"
                    : "Отображается"}
                </Chip>
                <div className="flex flex-row justify-self-end col-span-2">
                  <Button
                    variant="light"
                    isLoading={isDeleteLoading}
                    onClick={() =>
                      setIsEditCategory((prev) => ({
                        open: !prev.open,
                        categoryUuid: prev.open ? "" : uuid,
                      }))
                    }
                  >
                    <FaRegEdit size={20} />
                  </Button>
                  <Button
                    variant="light"
                    isLoading={isDeleteLoading}
                    onClick={() => setIsModalOpen({ open: true, uuid })}
                  >
                    <FiTrash size={20} />
                  </Button>
                </div>
              </div>
              <Divider className="my-1" />
              <Subcategories
                subcategory={subcategory}
                categoryName={name}
                uuid={uuid}
              />
            </CardBody>
          </Card>
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
