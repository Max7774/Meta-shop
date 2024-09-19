import { FC, PropsWithChildren, Suspense, useEffect } from "react";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "@utils/tokens";
import { Auth } from "../../Routes/data/components/root";
import { PROTECTED_ROUTES } from "./protected-routes.data";
import Loader from "@/main/UI/Loader";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAuth();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const { verifyAccessToken, logout } = useActions();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) verifyAccessToken();
  }, [accessToken]);

  useEffect(() => {
    if (location.pathname === "/auth" && refreshToken) {
      navigate("/");
    }
  }, [refreshToken, navigate, location.pathname]);

  useEffect(() => {
    if (!refreshToken && isAuth) logout();
  }, [location.pathname]);

  const IS_PROTECTED = PROTECTED_ROUTES.some((route) =>
    location.pathname?.startsWith(route)
  );

  if (!accessToken && IS_PROTECTED)
    return (
      <Suspense fallback={<Loader />}>
        <Auth />
      </Suspense>
    );

  return <>{children}</>;
};

export default AuthProvider;
