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
export const UserOrders = lazy(
  () => import("@/main/Screens/UserOrders/UserOrders")
);
export const About = lazy(() => import("@/main/Screens/About/About"));
export const Contacts = lazy(() => import("@/main/Screens/Contacts/Contacts"));
export const Receipt = lazy(() => import("@/main/Screens/Receipt/Receipt"));
export const ArchivedOrders = lazy(
  () => import("@/main/Components/ArchivedOrders/ArchivedOrders")
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
export const EditProduct = lazy(
  () => import("@/main/Screens/Admin/EditProduct/EditProduct")
);
export const AddCompany = lazy(
  () => import("@/main/Screens/Admin/AddCompany/AddCompany")
);

/* COMPANY */
export const AddProduct = lazy(
  () => import("@/main/Screens/Company/AddProduct/AddProduct")
);
export const Statistics = lazy(
  () => import("@/main/Screens/Company/Statistics/Statistics")
);
