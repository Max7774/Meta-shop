import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider";
import store from "@store/store";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default Providers;
