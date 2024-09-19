import store from "@store/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "@utils/toast.config";
import AuthProvider from "./AuthProvider/AuthProvider";

import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NextUIProvider>
          <AuthProvider>{children}</AuthProvider>
          {/* {children} */}
          <ToastContainer {...toastConfig} />
        </NextUIProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default Providers;
