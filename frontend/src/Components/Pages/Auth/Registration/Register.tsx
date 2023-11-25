import { AuthUI } from "@UI/AuthUI";
import { useActions } from "@hooks/useActions";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterType } from "types/user.type";
import VerifyAccount from "./VerifyAccount/VerifyAccount";

const Register = () => {
  const [isModalOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { register } = useActions();

  const { register: reg, handleSubmit, reset } = useForm<RegisterType>();

  const registerUser: SubmitHandler<RegisterType> = async (data) => {
    try {
      setLoading(true);
      await register(data);
      reset();
      setOpen(!isModalOpen);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center m-20 max-[420px]:mt-5 mr-5 ml-5">
      <div
        className="rounded shadow-2xl mins-w-2/5 p-10 bg-secondary"
        style={{ width: "900px" }}
      >
        <form onSubmit={handleSubmit(registerUser)}>
          <AuthUI.Heading className="capitalize text-center mb-4 text-white">
            Registration
          </AuthUI.Heading>
          <div className="flex flex-col">
            <div>
              <AuthUI.TextField
                {...reg("first_name")}
                placeholder="First name"
                color="white"
              />
              <AuthUI.TextField
                {...reg("second_name")}
                placeholder="Second name"
                color="white"
              />
              <AuthUI.TextField
                {...reg("phone_number")}
                placeholder="Phone number"
                color="white"
              />
              <AuthUI.TextField
                {...reg("town")}
                placeholder="Town"
                color="white"
              />
              <AuthUI.TextField
                {...reg("birth_day")}
                placeholder="Birthday"
                type="date"
                color="white"
              />
            </div>
            <div>
              <AuthUI.TextField
                {...reg("email")}
                placeholder="Email"
                color="white"
              />
              <AuthUI.TextField
                {...reg("password")}
                placeholder="Password"
                type="password"
                color="white"
              />
              <AuthUI.TextField
                placeholder="Repeat your password"
                type="password"
                color="white"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <AuthUI.Button
              isLoading={isLoading}
              type="submit"
              size="sm"
              variant="primary"
            >
              Register
            </AuthUI.Button>
          </div>
        </form>
        <div className="text-center text-gray flex flex-row justify-center">
          <div className="mr-1">Already have an account?</div>
          <Link
            className="text-white hover:text-primary transition-colors duration-200"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
      <AuthUI.Modal
        isOpen={isModalOpen}
        closeModal={() => setOpen(!isModalOpen)}
      >
        <VerifyAccount />
      </AuthUI.Modal>
    </section>
  );
};

export default Register;
