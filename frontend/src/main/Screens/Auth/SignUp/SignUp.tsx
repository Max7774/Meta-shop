/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import { Button, Input, Spacer } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import cn from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { validEmail } from "@utils/validations/valid-email";
import { TSignUp } from "@/types/TAuth";
import { toast } from "react-toastify";

const SignUp = () => {
  const { phoneRegister } = useActions();
  const { isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUp>();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const submit: SubmitHandler<TSignUp> = async (data) => {
    const result: any = await phoneRegister(data);

    if (result.type === "/phoneRegister/fulfilled") {
      if (pathname.startsWith("/auth")) navigate("/");
      toast.success("Вы успешно зарегистрировались!");
      toast.info("Не забудьте поменять пароль в профиле!");
    }
  };

  return (
    <form
      className="flex flex-col w-full sm:w-1/3 px-5 gap-2"
      onSubmit={handleSubmit(submit)}
    >
      <Controller
        control={control}
        name="first_name"
        key="first_name"
        rules={{
          required: "Это поле обязательно!",
        }}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            isRequired
            id="first_name"
            fullWidth
            label="Имя"
            variant="flat"
            size="lg"
            placeholder="Введите ваше имя"
            value={value}
            onChange={onChange}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="second_name"
        key="second_name"
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            id="second_name"
            fullWidth
            label="Фамилия"
            variant="flat"
            size="lg"
            placeholder="Введите вашу фамилию"
            value={value}
            onChange={onChange}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
      />
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
      <Controller
        name="phone_number"
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
                Номер телефона <span className="text-danger">*</span>
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
            {errors.phone_number && (
              <span className="text-danger text-xs">
                {errors.phone_number.message}
              </span>
            )}
          </>
        )}
      />
      <Spacer y={1} />
      <Button isLoading={isLoading} type="submit" color="primary">
        Войти
      </Button>
    </form>
  );
};

export default SignUp;
