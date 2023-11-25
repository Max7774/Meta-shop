import { useActions } from "@hooks/useActions";
import { validEmail } from "@utils/validations/valid-email";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserField } from "types/user.type";
import EmailForm from "../ResetPassword/EmailForm";
import { AuthUI } from "@UI/AuthUI";
import Links from "./Links/Links";
import { useAuthRedirect } from "@hooks/auth-hooks/useAuthRedirect";

const Login = () => {
  useAuthRedirect("login");
  const [isModalOpen, setIsOpen] = useState(false);
  const { login } = useActions();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserField>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginUserField> = (data) => {
    login(data);
    reset();
  };

  return (
    // <section className="flex justify-center m-40 max-[420px]:mt-30 mr-2 ml-2">
    <>
      <div
      // className="mins-w-2/5 p-10"
      // style={{ width: "600px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <AuthUI.Heading className="capitalize text-center mb-4 text-white">
            Войти
          </AuthUI.Heading>
          <AuthUI.TextField
            {...formRegister("email", {
              required: "Email is required",
              pattern: {
                value: validEmail,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Email"
            color="white"
            error={errors.email?.message}
          />
          <AuthUI.TextField
            {...formRegister("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min length should more 6 symbols",
              },
            })}
            placeholder="Password"
            type="password"
            color="white"
            error={errors.password?.message}
          />
          <div className="flex justify-center">
            <AuthUI.Button size="sm" variant="primary">
              Login
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
      </div>
    </>
    // </section>
  );
};

export default Login;
