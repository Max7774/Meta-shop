import { TAuthRoutes } from "@/types/TRoutesData";
import { ECompanyRoutes } from "@enums/ERoutes";
import {
  AddProduct,
  AdminOrders,
  ArchivedOrders,
  CompanyInfo,
  EditProduct,
  MassOperations,
  Statistics,
} from "../components/root";

export const COMPANY_ROUTES: TAuthRoutes<ECompanyRoutes>[] = [
  {
    id: "company-add-product-page",
    path: ECompanyRoutes.ADD_PRODUCT,
    component: AddProduct,
  },
  {
    id: "statistics-company-page",
    path: ECompanyRoutes.STATISTICS,
    component: Statistics,
  },
  {
    id: "edit-product-company-page",
    path: ECompanyRoutes.EDIT_PRODUCT,
    component: EditProduct,
  },
  {
    id: "orders-page-company",
    path: ECompanyRoutes.COMPANY_ORDERS,
    component: AdminOrders,
  },
  {
    id: "archived-orders-root-page-company",
    path: ECompanyRoutes.ARCHIVED_ORDERS,
    component: ArchivedOrders,
  },
  {
    id: "company-info-page",
    path: ECompanyRoutes.COMPANY_INFO,
    component: CompanyInfo,
  },
  {
    id: "mass-operations-root-page-company",
    path: ECompanyRoutes.MASS_OPERATIONS,
    component: MassOperations,
  },
];
