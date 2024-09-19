import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useActions } from "@hooks/useActions";
import { IModalActions } from "@/types/TModalActions";

export const useAuthRedirect = (modal: IModalActions) => {
  const { isAuth } = useAuth();
  const { closeModal } = useActions();

  useEffect(() => {
    if (isAuth) closeModal(modal);
  }, [isAuth, closeModal, modal]);
};
