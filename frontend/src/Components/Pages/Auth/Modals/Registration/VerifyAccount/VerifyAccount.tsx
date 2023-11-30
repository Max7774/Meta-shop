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
        Подтвердите свой аккаунт
      </AuthUI.Heading>
      <form onSubmit={handleSubmit(verify)}>
        <AuthUI.TextField
          {...formRegister("token", {
            required: "Код подтверждения обязателен",
            minLength: {
              value: 6,
              message: "Код подтверждения должен состоять из 6 цифр",
            },
          })}
          type="password"
          placeholder="Код"
          color="white"
          token
          helperText="Введите код подтверждения отправленный на почту"
          center
          error={errors.token?.message}
        />
        <div className="flex justify-center">
          <AuthUI.Button size="md" variant="primary">
            Подтвердить
          </AuthUI.Button>
        </div>
      </form>
    </>
  );
};

export default VerifyAccount;
