/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flip, Theme, ToastPosition } from "react-toastify";

type TToastConfig = {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  newestOnTop: boolean;
  closeOnClick: boolean;
  rtl: boolean;
  pauseOnFocusLoss: boolean;
  draggable: boolean;
  pauseOnHover: boolean;
  theme: Theme | undefined;
  style: object;
  transition: any;
};

export const toastConfig: TToastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
  style: { zIndex: 10000 },
  transition: Flip,
};
