import { AuthUI } from "@UI/AuthUI";
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
      <AuthUI.Heading className="text-lg text-center m-4 text-white">
        Write your email to reset password
      </AuthUI.Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthUI.TextField
          {...formRegister("email", {
            required: "Email is required",
            pattern: {
              value: validEmail,
              message: "Please enter a valid email addres",
            },
          })}
          className="bg"
          placeholder="Email"
          color="white"
          center
          error={errors.email?.message}
        />
        <div className="flex justify-center">
          <AuthUI.Button size="md" variant="primary">
            Send
          </AuthUI.Button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
