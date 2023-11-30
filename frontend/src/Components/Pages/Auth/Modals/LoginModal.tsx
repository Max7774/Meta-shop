import { Modal } from "@UI/index";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import Login from "./Login/Login";

const LoginModal = () => {
  const { login } = useAppSelector((store) => store.modals);
  const { closeModal } = useActions();

  return (
    <Modal isOpen={login} closeModal={() => closeModal("login")}>
      <Login />
    </Modal>
  );
};

export default LoginModal;
