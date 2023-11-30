import { Modal } from "@UI/index";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import React from "react";
import Register from "./Registration/Register";

const RegistrationModal = () => {
  const { register } = useAppSelector((store) => store.modals);
  const { closeModal } = useActions();
  return (
    <Modal isOpen={register} closeModal={() => closeModal("register")}>
      <Register />
    </Modal>
  );
};

export default RegistrationModal;
