/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCreateSubCategory } from "@/types/TCategory";
import { useActions } from "@hooks/useActions";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

interface ICreateFormProps {
  categoryName: {
    name: string;
    uuid: string;
  };
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateForm = ({ open, close, categoryName }: ICreateFormProps) => {
  const { createSubCategory } = useActions();

  const { handleSubmit, control, watch, setValue } =
    useForm<TCreateSubCategory>();

  const icon = watch("icon");

  const submit: SubmitHandler<TCreateSubCategory> = async (data) => {
    console.log(data);
    const result: any = await createSubCategory({
      categoryUuid: categoryName.uuid,
      name: data.name,
      icon: data.icon,
    });
    if (result.type === "/create-subcategory/fulfilled") {
      close(false);
    } else {
      toast.error("Ошибка создания подкатегории");
    }
  };

  if (icon) {
    console.log(URL.createObjectURL(icon));
  }

  return (
    <Modal isOpen={open} onOpenChange={() => close(!open)} placement="top">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center">
          Создание подкатегории для "{categoryName.name}"
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
            <Controller
              control={control}
              name="name"
              rules={{ required: "Это поле обязательно!" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Подкатегория"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="icon"
              rules={{ required: "Это поле обязательно!" }}
              render={({ field: { onChange } }) => (
                <Input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) onChange(e.target.files[0]);
                  }}
                />
              )}
            />
            <div className="flex">
              {icon && (
                <div className="relative">
                  <Image
                    src={URL.createObjectURL(icon)}
                    alt="..."
                    className="w-32 h-32 object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => setValue("icon", undefined)}
                    className="absolute -top-2 -right-2 z-10 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              )}
            </div>
            <Button fullWidth type="submit" color="primary">
              Создать
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" variant="light" onPress={() => close(!open)}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateForm;
