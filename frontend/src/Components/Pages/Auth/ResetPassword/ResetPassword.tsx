import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import TextField from "@UI/TextField/TextField";
import { useActions } from "@hooks/useActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetUserPasswordType } from "types/user.type";

const ResetPassword = () => {
  const { resetPasswordToken } = useActions();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetUserPasswordType>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ResetUserPasswordType> = async (data) => {
    resetPasswordToken(data);
    reset();
    navigate("/login");
  };
  return (
    <section className="flex justify-center m-40">
      <div
        className="rounded shadow-2xl mins-w-2/5 p-10 bg-secondary"
        style={{ width: "600px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading className="capitalize text-center mb-4 text-white">
            Reset password
          </Heading>
          <TextField
            {...formRegister("old_pass", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min length should more 6 symbols",
              },
            })}
            placeholder="Old password"
            type="password"
            color="white"
            error={errors.old_pass?.message}
          />
          <TextField
            {...formRegister("new_pass", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min length should more 6 symbols",
              },
            })}
            placeholder="New password"
            type="password"
            color="white"
            error={errors.new_pass?.message}
          />
          <TextField
            {...formRegister("resetToken", {
              required: "Token is required",
            })}
            placeholder="Token"
            type="password"
            token
            color="white"
            error={errors.resetToken?.message}
          />
          <div className="flex justify-center">
            <Button size="sm" variant="primary">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
