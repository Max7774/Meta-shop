import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import Modal from "@UI/Modal/Modal";
import TextField from "@UI/TextField/TextField";
import { useActions } from "@hooks/useActions";
import { validEmail } from "@utils/validations/valid-email";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginUserField } from "types/user.type";
import EmailForm from "../ResetPassword/EmailForm";

const Login = () => {
  const [authError, setAuthError] = useState("");
  const [isModalOpen, setIsOpen] = useState(false);
  const { login } = useActions();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserField>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginUserField> = async (data) => {
    const response: any = await login(data);
    setAuthError(response.payload);
    reset();
  };

  return (
    <section className="flex justify-center m-40 max-[420px]:mt-30 mr-2 ml-2">
      <div
        className="rounded shadow-2xl mins-w-2/5 p-10 bg-secondary"
        style={{ width: "600px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading className="capitalize text-center mb-4 text-white">
            Login
          </Heading>
          <TextField
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
          <TextField
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
          {authError && <div className="text-center text-red">{authError}</div>}
          <div className="flex justify-center">
            <Button size="sm" variant="primary">
              Login
            </Button>
          </div>
          <div
            onClick={() => setIsOpen(!isModalOpen)}
            className="text-center text-white hover:text-primary transition-colors duration-200"
          >
            Forgot your password?
          </div>
          <div className="text-center text-white">
            First time on the site?
            <Link
              className="text-gray hover:text-primary transition-colors duration-200"
              to="/register"
            >
              {" "}
              Register
            </Link>
          </div>
        </form>
        <Modal isOpen={isModalOpen} closeModal={() => setIsOpen(!isModalOpen)}>
          <EmailForm />
        </Modal>
      </div>
    </section>
  );
};

export default Login;
