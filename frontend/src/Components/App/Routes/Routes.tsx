import Login from "@Pages/Auth/Login/Login";
import Register from "@Pages/Auth/Registration/Register";
import ResetPassword from "@Pages/Auth/ResetPassword/ResetPassword";
import Main from "@Pages/Main/Main";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/reset",
      element: <ResetPassword />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
