import PermissionDenied from "@/main/Screens/PermissionDenied/PermissionDenied";
import Loader from "@/main/UI/Loader";
import { ERoles } from "@enums/ERoles";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const {
    profile: { role },
    isAuth,
    isLoading,
  } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader />;

  if (role !== ERoles.ADMIN) return <PermissionDenied />;

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;