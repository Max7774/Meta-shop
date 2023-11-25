import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useActions } from "@hooks/useActions";
import { IModalActions } from "@interfaces/data-interfaces/modal.interface";

export const useAuthRedirect = (modal: IModalActions) => {
  const { user } = useAuth();
  const { closeModal } = useActions();

  useEffect(() => {
    if (user) closeModal(modal);
  }, [user, closeModal, modal]);
};
