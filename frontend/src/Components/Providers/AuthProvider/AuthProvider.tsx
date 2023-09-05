import Auth from "@Pages/Auth/Auth";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import { protectedRoutes } from "@utils/protected-routes";
import { REFRESH_TOKEN, getAccessToken } from "@utils/tokens";
import Cookies from "js-cookie";
import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();

  const { pathname } = useLocation();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) checkAuth({ accessToken });
  }, [checkAuth]);

  useEffect(() => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (!refreshToken && user) logout();
  }, [pathname]);

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname?.startsWith(route)
  );

  if (!isProtectedRoute) return <>{children}</>;

  if (user) return <>{children}</>;
  if (user && isProtectedRoute) return <>{children}</>;

  if (pathname !== "/auth") return <Auth />;

  return null;
};

export default AuthProvider;
