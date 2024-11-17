import { TAuthRoutes } from "@/types/TRoutesData";
import { EAdminRoutes } from "@enums/ERoutes";
import {
  AddCompany,
  AdminAddProduct,
  AdminCategories,
  AdminMainPage,
  AdminOrders,
  AdminUsers,
  ArchivedOrders,
  Claims,
  EditProduct,
  MassOperations,
  SoftDeletedProducts,
} from "../components/root";

export const ADMIN_ROUTES: TAuthRoutes<EAdminRoutes>[] = [
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
    id: "edit-product-root-page-admin",
    path: EAdminRoutes.EDIT_PRODUCT,
    component: EditProduct,
  },
  {
    id: "archived-orders-root-page-admin",
    path: EAdminRoutes.ARCHIVED_ORDERS,
    component: ArchivedOrders,
  },
  {
    id: "add-company-root-page-admin",
    path: EAdminRoutes.ADD_COMPANY,
    component: AddCompany,
  },
  {
    id: "soft-deleted-root-page-admin",
    path: EAdminRoutes.SOFT_DELETED,
    component: SoftDeletedProducts,
  },
  {
    id: "claims-root-page-admin",
    path: EAdminRoutes.CLAIMS,
    component: Claims,
  },
  {
    id: "add-product-root-page-admin",
    path: EAdminRoutes.ADD_PRODUCT,
    component: AdminAddProduct,
  },
  {
    id: "mass-operations-root-page-admin",
    path: EAdminRoutes.MASS_OPERATIONS,
    component: MassOperations,
  }
];
