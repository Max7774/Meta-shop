import { FC } from "react";
import { LinksProps } from "./links.interface";
import { useActions } from "@hooks/useActions";

const LoginLinks: FC<LinksProps> = ({ setIsOpen, isModalOpen }) => {
  const { openModal } = useActions();
  return (
    <>
      <div
        onClick={() => setIsOpen(!isModalOpen)}
        className="text-center text-white hover:text-[#cacaca] transition-colors duration-200 hover:cursor-pointer"
      >
        Зыбыли свой пароль?
      </div>
      <div className="text-center flex flex-row justify-center text-gray">
        Первый раз на сайте?
        <div
          className="ml-2 text-white hover:text-[#cacaca] hover:cursor-pointer transition-colors duration-200"
          onClick={() => openModal("register")}
        >
          Зарегистрироваться
        </div>
      </div>
    </>
  );
};

export default LoginLinks;

export const RegisterLinks = () => {
  const { closeModal } = useActions();
  return (
    <div className="text-center text-gray flex flex-row justify-center">
      <div className="mr-1">Есть аккаунт?</div>
      <div
        className="text-white hover:text-[#cacaca] hover:cursor-pointer transition-colors duration-200"
        onClick={() => closeModal("register")}
      >
        Войти
      </div>
    </div>
  );
};
