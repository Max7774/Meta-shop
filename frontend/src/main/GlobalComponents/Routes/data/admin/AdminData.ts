import { TRoutes } from "@/types/TRoutesData";
import { EAdminRoutes } from "@enums/ERoutes";
import {
  AdminCategories,
  AdminMainPage,
  AdminOrders,
  AdminProducts,
  AdminUsers,
  ArchivedOrders,
  EditProduct,
} from "../components/root";

export const ADMIN_ROUTES: TRoutes<EAdminRoutes>[] = [
  {
    id: "root-page-admin",
    path: EAdminRoutes.ROOT,
    component: AdminMainPage,
  },
  {
    id: "orders-page-admin",
    path: EAdminRoutes.ORDERS,
    component: AdminOrders,
  },
  {
    id: "categories-subcategories-page-admin",
    path: EAdminRoutes.CATEGORIES,
    component: AdminCategories,
  },
  {
    id: "orders-page-admin",
    path: EAdminRoutes.USERS,
    component: AdminUsers,
  },
  {
    id: "create-products-page-admin",
    path: EAdminRoutes.PRODUCTS,
    component: AdminProducts,
  },
  {
    id: "edit-product-root-page-admin",
    path: EAdminRoutes.EDIT_PRODUCT,
    component: EditProduct,
  },
  {
    id: "archived-orders-root-page-admin",
    path: EAdminRoutes.ARCHIVED_ORDERS,
    component: ArchivedOrders,
  },
];
