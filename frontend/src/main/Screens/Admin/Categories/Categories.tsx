import Heading from "@/main/UI/Heading";
import { useActions } from "@hooks/useActions";
import { useCategory } from "@hooks/useCategory";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";

const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState({ open: false, uuid: "" });
  const { createCategory, deleteCategory } = useActions();
  const { categories, isLoading, isDeleteLoading } = useCategory();
  const { control, handleSubmit, reset } = useForm<{ category_name: string }>();

  const submit: SubmitHandler<{ category_name: string }> = (data) => {
    createCategory(data);
    reset();
  };

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
      {categories.map(({ name, uuid }) => (
        <Card fullWidth className="my-4">
          <CardBody>
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold">{name}</p>
              <Button
                variant="light"
                isLoading={isDeleteLoading}
                onClick={() => setIsModalOpen({ open: true, uuid })}
              >
                <FiTrash size={20} />
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
      <Modal isOpen={isModalOpen.open} placement="top">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-warning text-center">
            Вы уверены что хотите удалить категорию?
          </ModalHeader>
          <ModalBody>
            <span className="font-bold text-center">
              К этой категории могут быть привязаны продукты
            </span>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsModalOpen({ open: false, uuid: "" })}
            >
              Закрыть
            </Button>
            <Button
              color="primary"
              onPress={() => {
                deleteCategory(isModalOpen.uuid);
                setIsModalOpen({ open: false, uuid: "" });
              }}
            >
              Применить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AdminCategories;
