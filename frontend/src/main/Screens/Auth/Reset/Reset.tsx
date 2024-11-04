import Heading from "@/main/UI/Heading";
import { TTypeOfAuth } from "types/auth.types";
import ResetPasswordForm from "@Components/ResetPasswordForm/ResetPasswordForm";

interface IResetProps {
  setTypeOfAuth: React.Dispatch<React.SetStateAction<TTypeOfAuth>>;
}

const Reset = ({ setTypeOfAuth }: IResetProps) => {
  return (
    <>
      <Heading className="text-center">Восстановление пароля</Heading>
      <ResetPasswordForm setTypeOfAuth={setTypeOfAuth} />
    </>
  );
};

export default Reset;
