import OneProduct from "@Pages/(OneProduct)/OneProduct";
import Main from "@Pages/Main/Main";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/product/:slug" element={<OneProduct />} />
    </Routes>
  );
};

export default MainRoutes;
