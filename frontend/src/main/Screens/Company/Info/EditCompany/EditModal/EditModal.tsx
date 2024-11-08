/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEditCompany } from "@/types/TCompany";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { Button, Image, Input } from "@nextui-org/react";
import Heading from "@UI/Heading";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import cn from "clsx";
import InputMask from "react-input-mask";
import { validEmail } from "@utils/validations/valid-email";
import { useActions } from "@hooks/useActions";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

interface IEditModalProps {
  onClose: () => void;
}

const EditModal = ({ onClose }: IEditModalProps) => {
  const {
    isEditLoading,
    info: {
      name,
      phoneNumber,
      address,
      email,
      officialName,
      deliveryPrice,
      minimumOrderPrice,
    },
  } = useAppSelector((state) => state.company);
  const { handleSubmit, control, setValue, watch } = useForm<TEditCompany>();
  const { editCompanyInfo } = useActions();

  const logoPath = watch("logoPath");

  const submit: SubmitHandler<TEditCompany> = async (data) => {
    const res: any = await editCompanyInfo({
      ...data,
      deliveryPrice: Number(data.deliveryPrice),
      minimumOrderPrice: Number(data.minimumOrderPrice),
    });
    if (res.type === "/company/edit-info/fulfilled") {
      onClose();
    } else {
      toast.error("Ошибка редактирования");
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
          control={control}
          name="deliveryPrice"
          defaultValue={deliveryPrice}
          rules={{
            required: "Это обязательное поле!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Стоимость доставки"
              placeholder="Введите цену"
              fullWidth
              onChange={onChange}
              type="number"
              value={value.toString()}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="minimumOrderPrice"
          defaultValue={minimumOrderPrice}
          rules={{
            required: "Это обязательное поле!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Минимальная стоимость заказа"
              placeholder="Введите цену"
              fullWidth
              onChange={onChange}
              type="number"
              value={value.toString()}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
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
        <Controller
          control={control}
          name="logoPath"
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
          {logoPath && (
            <div className="relative">
              <Image
                src={URL.createObjectURL(logoPath)}
                alt="..."
                className="w-32 h-32 object-cover rounded-2xl"
              />
              <button
                onClick={() => setValue("logoPath", undefined)}
                className="absolute -top-2 -right-2 z-10 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <IoClose size={20} />
              </button>
            </div>
          )}
        </div>
        <Button isLoading={isEditLoading} type="submit" color="primary">
          Редактировать
        </Button>
      </form>
    </div>
  );
};

export default EditModal;
