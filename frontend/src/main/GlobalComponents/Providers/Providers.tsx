import store from "@store/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "@utils/toast.config";
import AuthProvider from "./AuthProvider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { NextUIProvider } from "@nextui-org/react";

import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <NextUIProvider>
            <AuthProvider>{children}</AuthProvider>
            <ToastContainer {...toastConfig} />
          </NextUIProvider>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default Providers;
