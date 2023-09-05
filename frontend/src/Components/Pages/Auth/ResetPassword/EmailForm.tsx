import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import TextField from "@UI/TextField/TextField";
import { useActions } from "@hooks/useActions";
import { validEmail } from "@utils/validations/valid-email";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EmailForm = () => {
  const { resetPasswordEmail } = useActions();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>({ mode: "onChange" });

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    resetPasswordEmail(data.email);
    reset();
    navigate("/reset");
  };

  return (
    <div>
      <Heading className="text-sm capitalize text-center m-4">
        Write your email to reset password
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...formRegister("email", {
            required: "Email is required",
            pattern: {
              value: validEmail,
              message: "Please enter a valid email addres",
            },
          })}
          placeholder="Email"
          center
          error={errors.email?.message}
        />
        <div className="flex justify-center">
          <Button size="md" variant="secondary">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
