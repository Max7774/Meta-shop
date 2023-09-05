import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import TextField from "@UI/TextField/TextField";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserField } from "types/user.type";

const Login = () => {
  const [authError, setAuthError] = useState("");

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserField>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginUserField> = async (data) => {
    //   const response: any = await login(data);
    //   setAuthError(response.payload);
    reset();
  };

  return (
    <section className="flex justify-center m-40 max-[420px]:mt-30 mr-2 ml-2">
      <div
        className="rounded shadow-2xl mins-w-2/5 p-10 bg-secondary"
        style={{ width: "600px" }}
      >
        <form>
          <Heading className="capitalize text-center mb-4 text-white">
            Login
          </Heading>
          <TextField placeholder="Email" color="white" />
          <TextField placeholder="Password" type="password" color="white" />
          <div className="flex justify-center">
            <Button size="sm" variant="primary">
              Login
            </Button>
          </div>
          <div className="text-center text-white">
            <a href="/">Forgot your password?</a>
          </div>
          <div className="text-center text-white">
            First time on the site?
            <a
              className="text-gray hover:text-primary transition-colors duration-200"
              href="/registration"
            >
              {" "}
              Register
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
