import { Button, Input, Spacer } from "@nextui-org/react";
// import { TTypeOfAuth } from "../auth.types";
import { useActions } from "@hooks/useActions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TLogin } from "@/types/TAuth";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./Icons/Icons";
// import { validEmail } from "@utils/validations/valid-email";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useActions();
  const { isLoading } = useAuth();
  const { control, handleSubmit } = useForm<TLogin>();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submit: SubmitHandler<TLogin> = (data) => {
    login(data);
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
            // pattern: {
            //   value: validEmail,
            //   message: "Неверно введен email",
            // },
          }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="email"
              fullWidth
              variant="flat"
              size="lg"
              placeholder="Email"
              // type="email"
              required
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
              id="password"
              variant="flat"
              fullWidth
              size="lg"
              placeholder="Пароль"
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
              required
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
      {/* <div className="flex justify-center">
        <div className="text-md">
          Забыли пароль?{" "}
          <Button
            className="text-md"
            onClick={() => setTypeOfAuth("reset-password")}
            variant="light"
          >
            Восстановить
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default Login;
