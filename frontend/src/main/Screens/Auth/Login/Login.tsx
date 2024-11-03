/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Spacer } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TLogin } from "@/types/TAuth";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./Icons/Icons";
import { validEmail } from "@utils/validations/valid-email";
import { TTypeOfAuth } from "../auth.types";
import { useNavigate } from "react-router-dom";

interface ILoginProps {
  setTypeOfAuth: React.Dispatch<React.SetStateAction<TTypeOfAuth>>;
}

const Login = ({ setTypeOfAuth }: ILoginProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useActions();
  const { isLoading } = useAuth();
  const { control, handleSubmit } = useForm<TLogin>();

  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submit: SubmitHandler<TLogin> = async (data) => {
    const result: any = await login(data);

    if (result === "/login/fulfilled") {
      navigate(-1);
    }
  };

  return (
    <>
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
          control={control}
          name="password"
          key="password"
          rules={{
            required: "Это поле обязательно!",
            minLength: {
              value: 6,
              message: "Минимальная длина пароля 6 символов",
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              isRequired
              id="password"
              variant="flat"
              fullWidth
              size="lg"
              label="Пароль"
              placeholder="Введите пароль"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="h-[25px] w-[25px] text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="h-[25px] w-[25px] text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              value={value}
              onChange={onChange}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Spacer y={1.5} />
        <Button isLoading={isLoading} type="submit" color="primary">
          Войти
        </Button>
      </form>
      <div className="flex justify-center items-center gap-2">
        <div className="text-md">Забыли пароль?</div>
        <Button
          className="text-md"
          onClick={() => setTypeOfAuth("reset-password")}
          variant="flat"
        >
          Восстановить
        </Button>
      </div>
    </>
  );
};

export default Login;
