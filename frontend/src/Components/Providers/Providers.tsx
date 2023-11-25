import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider";
import store from "@store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthModals from "@Pages/Auth/Modals";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
        <AuthModals />
        <ToastContainer
          autoClose={2000}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
        />
      </Provider>
    </BrowserRouter>
  );
};

export default Providers;
