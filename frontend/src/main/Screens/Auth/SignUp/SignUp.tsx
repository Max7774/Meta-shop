import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import { Button, Spacer } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import cn from "clsx";

const SignUp = () => {
  const { phoneRegister } = useActions();
  const { isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone_number: string }>();

  const submit: SubmitHandler<{ phone_number: string }> = (data) => {
    phoneRegister(data);
  };

  return (
    <form
      className="flex flex-col w-full sm:w-1/3 px-5 gap-2"
      onSubmit={handleSubmit(submit)}
    >
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
