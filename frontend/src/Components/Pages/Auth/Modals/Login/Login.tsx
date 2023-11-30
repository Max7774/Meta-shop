import { useActions } from "@hooks/useActions";
import { validEmail } from "@utils/validations/valid-email";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserField } from "types/user.type";
import EmailForm from "../ResetPassword/EmailForm";
import { AuthUI } from "@UI/AuthUI";
import Links from "../../Links/Links";
import { useAuthRedirect } from "@hooks/auth-hooks/useAuthRedirect";

const Login = () => {
  useAuthRedirect("login");
  const [isModalOpen, setIsOpen] = useState(false);
  const { login } = useActions();
  const form = useForm<LoginUserField>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginUserField> = (data) => {
    login(data);
    form.reset();
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AuthUI.Heading className="capitalize text-center mb-4 text-white">
          Авторизация
        </AuthUI.Heading>
        <AuthUI.TextField
          {...form.register("email", {
            required: "Поле электронной почты обязательно для заполнения!",
            pattern: {
              value: validEmail,
              message: "Пожалуйста введите корректный email",
            },
          })}
          placeholder="Email"
          color="white"
          error={form.formState.errors.email?.message}
        />
        <AuthUI.TextField
          {...form.register("password", {
            required: "Поле пароля обязательно для заполнения!",
            minLength: {
              value: 6,
              message: "Минимальная длина пароля 6 символов",
            },
          })}
          placeholder="Пароль"
          type="password"
          color="white"
          error={form.formState.errors.password?.message}
        />
        <div className="flex justify-center">
          <AuthUI.Button size="sm" variant="primary">
            Войти
          </AuthUI.Button>
        </div>
      </form>
      <Links setIsOpen={setIsOpen} isModalOpen={isModalOpen} />
      <AuthUI.Modal
        isOpen={isModalOpen}
        closeModal={() => setIsOpen(!isModalOpen)}
      >
        <EmailForm />
      </AuthUI.Modal>
    </>
  );
};

export default Login;
