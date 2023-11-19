import { AuthUI } from "@UI/AuthUI";
import { useActions } from "@hooks/useActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const VerifyAccount = () => {
  const { verifyAccount } = useActions();
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>();

  const verify: SubmitHandler<{ token: string }> = (data) => {
    verifyAccount(data.token);
    navigate("/");
  };

  return (
    <>
      <AuthUI.Heading className="text-lg text-center m-4 text-white">
        Verify your account
      </AuthUI.Heading>
      <form onSubmit={handleSubmit(verify)}>
        <AuthUI.TextField
          {...formRegister("token", {
            required: "Token is required",
          })}
          type="password"
          placeholder="Token"
          color="white"
          token
          helperText="Enter token from email"
          center
          error={errors.token?.message}
        />
        <div className="flex justify-center">
          <AuthUI.Button size="md" variant="primary">
            Send
          </AuthUI.Button>
        </div>
      </form>
    </>
  );
};

export default VerifyAccount;
