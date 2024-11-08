import { TAddCompany } from "@/types/TAddCompany";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
  Input,
} from "@nextui-org/react";
import Heading from "@UI/Heading";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import cn from "clsx";
import InputMask from "react-input-mask";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { validEmail } from "@utils/validations/valid-email";
import CompanyList from "@Components/CompanyList/CompanyList";
import { IoClose } from "react-icons/io5";

const AddCompany = () => {
  const { addCompany } = useActions();
  const { handleSubmit, control, reset, watch, setValue } =
    useForm<TAddCompany>();

  const logoPath = watch("logoPath");

  const { isAddingLoading, tempData } = useAppSelector(
    (state) => state.company
  );

  const submit: SubmitHandler<TAddCompany> = async (data) => {
    addCompany(data);
    reset();
  };

  return (
    <section>
      <Heading>Добавление фирмы</Heading>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
        <Controller
          control={control}
          name="name"
          defaultValue=""
          rules={{
            required: "Это обязательное поле!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Название фирмы"
              placeholder="Введите название фирмы"
              fullWidth
              onChange={onChange}
              value={value}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="deliveryPrice"
          defaultValue={0}
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
          defaultValue={0}
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
          control={control}
          name="englishName"
          defaultValue=""
          rules={{
            required: "Это обязательное поле!",
            pattern: {
              value: /^[A-Za-z]+$/,
              message:
                "Используйте только английские буквы без пробелов и других символов",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Название фирмы на английском"
              placeholder="Введите название фирмы английском"
              fullWidth
              onChange={onChange}
              value={value}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="officialName"
          defaultValue=""
          rules={{
            required: "Это обязательное поле!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Официальное название фирмы"
              placeholder="Введите официальное название фирмы"
              fullWidth
              onChange={onChange}
              value={value}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          defaultValue=""
          rules={{
            required: "Это обязательное поле!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Адрес фирмы"
              placeholder="Введите адрес фирмы"
              fullWidth
              onChange={onChange}
              value={value}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{
            required: "Это обязательное поле!",
            pattern: {
              value: validEmail,
              message: "Неверно введен email",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Email фирмы"
              placeholder="Введите email фирмы"
              fullWidth
              onChange={onChange}
              value={value}
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
        <Button
          isLoading={isAddingLoading}
          type="submit"
          color="primary"
          fullWidth
        >
          Добавить
        </Button>
      </form>
      {isAddingLoading && <CircularProgress />}
      {tempData && (
        <Card className="mt-4">
          <CardHeader>Данные для входа</CardHeader>
          <CardBody>
            <div className="flex flex-col items-center">
              <p className="text-default-400">
                (Техническая почта, специально для входа в приложение)
              </p>
              <p>Email: {tempData.email}</p>
            </div>
            <div>Пароль: {tempData.password}</div>
          </CardBody>
        </Card>
      )}

      <div className="mt-4">
        <CompanyList />
      </div>
    </section>
  );
};

export default AddCompany;
