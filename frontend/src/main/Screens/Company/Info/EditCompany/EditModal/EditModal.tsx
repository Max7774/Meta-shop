/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEditCompany } from "@/types/TCompany";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { Button, Input } from "@nextui-org/react";
import Heading from "@UI/Heading";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import cn from "clsx";
import InputMask from "react-input-mask";
import { validEmail } from "@utils/validations/valid-email";
import { useActions } from "@hooks/useActions";
import { toast } from "react-toastify";

interface IEditModalProps {
  onClose: () => void;
}

const EditModal = ({ onClose }: IEditModalProps) => {
  const {
    isEditLoading,
    info: { name, phoneNumber, address, email, officialName },
  } = useAppSelector((state) => state.company);
  const { handleSubmit, control } = useForm<TEditCompany>();
  const { editCompanyInfo } = useActions();

  const submit: SubmitHandler<TEditCompany> = async (data) => {
    const res: any = await editCompanyInfo(data);
    if (res.type === "/company/edit-info/fulfilled") {
      onClose();
    } else {
        toast.error('Ошибка редактирования')
    }
  };

  return (
    <div className="p-5">
      <Heading>Редактирование</Heading>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
        <Controller
          name="name"
          control={control}
          defaultValue={name}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Название компании"
              placeholder="Введите название компании"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue={address}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Адрес компании"
              placeholder="Введите адрес компании"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue={email}
          rules={{
            pattern: {
              value: validEmail,
              message: "Неверно введен email",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              type="email"
              label="Почта компании"
              placeholder="Введите почту компании"
              onChange={onChange}
              value={value}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="officialName"
          control={control}
          defaultValue={officialName}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Официальное название компании"
              placeholder="Введите официальное название компании"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Номер телефона обязателен!",
            pattern: {
              value: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
              message:
                "Введите полный номер телефона в формате +7(XXX)-XXX-XX-XX",
            },
          }}
          defaultValue={phoneNumber}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="flex flex-col gap-1">
              <InputMask
                onChange={onChange}
                value={value}
                mask="+7(999)-999-99-99"
                placeholder="+7(___)-___-__-__"
                maskChar="_"
                className={cn(
                  "px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-foreground-500 rounded-xl",
                  {
                    "bg-danger-50": !!error?.message,
                    "bg-default-100": !error?.message,
                  }
                )}
              />
              {error?.message && (
                <span className="text-danger text-xs">{error?.message}</span>
              )}
            </div>
          )}
        />
        <Button isLoading={isEditLoading} type="submit" color="primary">
          Редактировать
        </Button>
      </form>
    </div>
  );
};

export default EditModal;
