import { TRoutes } from "@/types/TRoutesData";
import { ECompanyRoutes } from "@enums/ERoutes";
import { AddProduct, Statistics } from "../components/root";

export const COMPANY_ROUTES: TRoutes<ECompanyRoutes>[] = [
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
];
