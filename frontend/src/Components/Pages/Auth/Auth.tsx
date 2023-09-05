import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import TextField from "@UI/TextField/TextField";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserField, RegisterType } from "types/user.type";

const Auth = () => {
  const [type, setType] = useState<"Login" | "Register">("Login");
  const [authError, setAuthError] = useState("");

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserField | RegisterType>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginUserField | RegisterType> = async (
    data
  ) => {
    if (type === "Login") {
      //   const response: any = await login(data);
      //   setAuthError(response.payload);
    } else if (type === "Register") {
      //   const response: any = await register(data);
      //   setAuthError(response.payload);
    }
    reset();
  };

  return (
    <section className="flex justify-center m-40">
      <div
        className="rounded-xl shadow-2xl mins-w-2/5 p-10 bg-secondary"
        style={{ width: "600px" }}
      >
        <form>
          <Heading className="capitalize text-center mb-4 text-white">
            {type}
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
        </form>
      </div>
    </section>
  );
};

export default Auth;
