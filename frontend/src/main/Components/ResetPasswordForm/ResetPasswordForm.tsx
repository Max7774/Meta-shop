import { TResetPassword } from "@/types/TAuth";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { Button, Input, Spacer } from "@nextui-org/react";
import { validEmail } from "@utils/validations/valid-email";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./Icons/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { TTypeOfAuth } from "types/auth.types";
import { toast } from "react-toastify";
import cn from "clsx";

interface IResetPasswordFormProps {
  setTypeOfAuth?: React.Dispatch<React.SetStateAction<TTypeOfAuth>>;
}

const ResetPasswordForm = ({ setTypeOfAuth }: IResetPasswordFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { sendEmailToResetPassword, resetPassword } = useActions();
  const { handleSubmit, control } = useForm<TResetPassword>();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { resetPasswordCode, isLoading, isAuth } = useAppSelector(
    (state) => state.user
  );

  const submit: SubmitHandler<TResetPassword> = async (data) => {
    if (resetPasswordCode === "none") {
      await sendEmailToResetPassword(data.email || "");
    } else if (resetPasswordCode === "waiting code") {
      await resetPassword({
        resetToken: data.resetToken,
        new_pass: data.new_pass,
      });
    }
  };

  useEffect(() => {
    if (resetPasswordCode === "fulfilled" && pathname.startsWith("/auth")) {
      if (setTypeOfAuth) {
        setTypeOfAuth("login");
        navigate("/auth/login");
      }
    } else if (resetPasswordCode === "fulfilled") {
      toast.success("Пароль изменен успешно!");
    }
  }, [resetPasswordCode, navigate, setTypeOfAuth, pathname]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={cn("flex flex-col gap-2", {
        "px-5 sm:w-1/3": !isAuth,
      })}
    >
      {resetPasswordCode === "none" && (
        <Controller
          control={control}
          name="email"
          rules={{
            required: resetPasswordCode === "none" && "Это поле обязательно!",
            pattern:
              resetPasswordCode === "none"
                ? {
                    value: validEmail,
                    message: "Неверно введен email",
                  }
                : undefined,
          }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              fullWidth
              label="Почта"
              variant="flat"
              size="lg"
              placeholder="Введите email"
              type="email"
              onChange={onChange}
              value={value}
              isRequired
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
      )}
      {resetPasswordCode === "waiting code" && (
        <>
          <Controller
            control={control}
            name="new_pass"
            rules={{
              required: "Это поле обязательно!",
            }}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                fullWidth
                label="Новый пароль"
                variant="flat"
                size="lg"
                placeholder="Введите новый пароль"
                onChange={onChange}
                value={value}
                isRequired
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
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="resetToken"
            rules={{
              required: "Это поле обязательно!",
            }}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                fullWidth
                label="Код"
                variant="flat"
                size="lg"
                placeholder="Введите код с почты"
                type="text"
                onChange={onChange}
                value={value}
                isRequired
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
        </>
      )}
      <Spacer y={1.5} />
      <Button isLoading={isLoading} type="submit" color="primary">
        {resetPasswordCode === "none" ? "Отправить код" : "Восстановить"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
