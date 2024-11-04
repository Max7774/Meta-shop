import { TTypeOfAuth } from "types/auth.types";
import Login from "./Login/Login";
import Reset from "./Reset/Reset";
import SignUp from "./SignUp/SignUp";

interface ISignProviderProps {
  type: TTypeOfAuth;
  setTypeOfAuth: React.Dispatch<React.SetStateAction<TTypeOfAuth>>;
}

const SignProvider = ({ type, setTypeOfAuth }: ISignProviderProps) => {
  if (type === "login") return <Login setTypeOfAuth={setTypeOfAuth} />;
  if (type === "register") return <SignUp />;
  if (type === "reset-password") return <Reset setTypeOfAuth={setTypeOfAuth} />;
};

export default SignProvider;
