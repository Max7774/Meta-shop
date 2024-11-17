/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCreateClaim } from "@/types/TClaim";
import { EnumTypeOfClaim } from "@enums/EClaim";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { validEmail } from "@utils/validations/valid-email";
import cn from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const ClaimForm = () => {
  const { createClaim } = useActions();
  const { isLoading } = useAppSelector((state) => state.claim);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateClaim>();

  const navigate = useNavigate();

  const submit: SubmitHandler<TCreateClaim> = async (data) => {
    const { type }: any = await createClaim(data);

    if (type === "/create-claim/fulfilled") {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col w-full sm:w-1/3 px-5 gap-2"
    >
      <Controller
        control={control}
        name="email"
        key="email"
        rules={{
          required: "Это поле обязательно!",
          pattern: {
            value: validEmail,
            message: "Неверно введен email",
          },
        }}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            isRequired
            id="email"
            fullWidth
            label="Почта"
            variant="flat"
            size="lg"
            placeholder="Введите email"
            type="email"
            value={value}
            onChange={onChange}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
      />
      <Spacer y={1.5} />
      <Controller
        name="phone"
        control={control}
        rules={{
          pattern: {
            value: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
            message:
              "Введите полный номер телефона в формате +7(XXX)-XXX-XX-XX",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <div
              className={cn(
                "px-4 py-2 outline-none flex flex-col focus:border-primary transition-all placeholder:text-foreground-500 rounded-2xl",
                {
                  "bg-danger-50": !!error?.message,
                  "bg-default-100": !error?.message,
                }
              )}
            >
              <span className="text-sm mb-2 block text-foreground-500">
                Номер телефона
              </span>
              <InputMask
                onChange={onChange}
                value={value}
                className={cn(
                  "focus:border-primary placeholder:text-foreground-500 outline-none",
                  {
                    "bg-danger-50": !!error?.message,
                    "bg-default-100": !error?.message,
                  }
                )}
                mask="+7(999)-999-99-99"
                placeholder="+7(___)-___-__-__"
                maskChar="_"
              />
            </div>
            {errors.phone && (
              <span className="text-danger text-xs">
                {errors.phone.message}
              </span>
            )}
          </>
        )}
      />

      <Spacer y={1.5} />
      <Controller
        control={control}
        name="type"
        rules={{ required: "Это поле обязательно" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            isRequired
            isInvalid={!!error?.message}
            errorMessage={error?.message}
            label="Тип заявки"
            labelPlacement="outside"
            placeholder="Выберите тип заявки"
            selectedKeys={new Set([value])}
            onSelectionChange={(selected) =>
              onChange(Array.from(selected).join(""))
            }
          >
            <SelectItem key={EnumTypeOfClaim.Complaint}>Жалоба</SelectItem>
            <SelectItem key={EnumTypeOfClaim.Cooperation}>
              Сотрудничество
            </SelectItem>
            <SelectItem key={EnumTypeOfClaim.Other}>Другое</SelectItem>
          </Select>
        )}
      />
      <Spacer y={1.5} />
      <Controller
        control={control}
        name="text"
        rules={{ required: "Описание обязательно" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Textarea
            isRequired
            label="Описание"
            placeholder="Введите описание вашей заявки"
            isInvalid={!!error?.message}
            errorMessage={error?.message}
            onChange={onChange}
            value={value}
            fullWidth
          />
        )}
      />
      <Spacer y={1.5} />
      <Button isLoading={isLoading} type="submit" color="primary">
        Оставить заявку
      </Button>
    </form>
  );
};

export default ClaimForm;
