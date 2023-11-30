import { Modal } from "@UI/index";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import React from "react";
import ResetPassword from "./ResetPassword/ResetPassword";

const ResetPasswordModal = () => {
  const { resetPassword } = useAppSelector((store) => store.modals);
  const { closeModal } = useActions();
  return (
    <Modal
      isOpen={resetPassword}
      closeModal={() => closeModal("resetPassword")}
    >
      <ResetPassword />
    </Modal>
  );
};

export default ResetPasswordModal;
