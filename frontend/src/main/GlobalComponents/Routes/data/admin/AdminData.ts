import { TRoutes } from "@/types/TRoutesData";
import { EAdminRoutes } from "@enums/ERoutes";
import {
  AdminCategories,
  AdminMainPage,
  AdminOrders,
  AdminProducts,
  AdminUsers,
} from "../components/root";

export const ADMIN_ROUTES: TRoutes<EAdminRoutes>[] = [
  {
    id: "root-page",
    path: EAdminRoutes.ROOT,
    component: AdminMainPage,
  },
  {
    id: "orders-page",
    path: EAdminRoutes.ORDERS,
    component: AdminOrders,
  },
  {
    id: "root-page",
    path: EAdminRoutes.CATEGORIES,
    component: AdminCategories,
  },
  {
    id: "orders-page",
    path: EAdminRoutes.USERS,
    component: AdminUsers,
  },
  {
    id: "root-page",
    path: EAdminRoutes.PRODUCTS,
    component: AdminProducts,
  },
];
