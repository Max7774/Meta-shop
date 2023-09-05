/* eslint-disable react-hooks/exhaustive-deps */
import Login from "@Pages/Auth/Login/Login";
import Register from "@Pages/Auth/Registration/Register";
import ResetPassword from "@Pages/Auth/ResetPassword/ResetPassword";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
// import { protectedRoutes } from "@utils/protected-routes";
import { REFRESH_TOKEN, getAccessToken } from "@utils/tokens";
import Cookies from "js-cookie";
import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) checkAuth({ accessToken });

    if (!accessToken) {
      navigate("/login");
    } else if (pathname === "/login") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (!refreshToken && user) logout();
  }, []);

  // const isProtectedRoute = protectedRoutes.some(
  //   (route) => pathname?.startsWith(route)
  // );

  // if (!isProtectedRoute) return <>{children}</>;

  if (user) return <>{children}</>;
  // if (user && isProtectedRoute) return <>{children}</>;

  if (pathname === "/login") return <Login />;
  if (pathname === "/register") return <Register />;
  if (pathname === "/reset") return <ResetPassword />;

  return null;
};

export default AuthProvider;
