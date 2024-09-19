import { lazy } from "react";

/* ROOT */
export const MainPage = lazy(() => import("@/main/Screens/MainPage/MainPage"));
export const ProductPage = lazy(
  () => import("@/main/Screens/ProductPage/ProductPage")
);
export const SubCategories = lazy(
  () => import("@/main/Screens/SubCategories/SubCategories")
);
export const SubCategoriesProducts = lazy(
  () => import("@/main/Screens/SubCategoriesProducts/SubCategoriesProducts")
);

export const Auth = lazy(() => import("@/main/Screens/Auth/Auth"));
export const OrderPage = lazy(
  () => import("@/main/Screens/OrderPage/OrderPage")
);
export const ProfilePage = lazy(
  () => import("@/main/Screens/Profile/ProfilePage")
);

/* ADMIN */
export const AdminMainPage = lazy(
  () => import("@/main/Screens/Admin/Main/Main")
);
export const AdminOrders = lazy(
  () => import("@/main/Screens/Admin/Orders/Orders")
);
export const AdminCategories = lazy(
  () => import("@/main/Screens/Admin/Categories/Categories")
);
export const AdminUsers = lazy(
  () => import("@/main/Screens/Admin/Users/Users")
);
export const AdminProducts = lazy(
  () => import("@/main/Screens/Admin/Products/Products")
);
