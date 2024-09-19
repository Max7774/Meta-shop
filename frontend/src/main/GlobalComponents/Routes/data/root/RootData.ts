import { TRoutes } from "@/types/TRoutesData";
import { ERoutes } from "@enums/ERoutes";
import {
  MainPage,
  OrderPage,
  ProductPage,
  ProfilePage,
  SubCategories,
  SubCategoriesProducts,
} from "../components/root";

export const ROOT_DATA: TRoutes<ERoutes>[] = [
  {
    id: "root-page",
    path: ERoutes.ROOT,
    component: MainPage,
  },
  {
    id: "product-page",
    path: ERoutes.PRODUCT_CARD,
    component: ProductPage,
  },
  {
    id: "categories-page",
    path: ERoutes.CATEGORIES,
    component: SubCategories,
  },
  {
    id: "subcategories-products-page",
    path: ERoutes.SUB_CATEGORIES,
    component: SubCategoriesProducts,
  },
  {
    id: "order-page",
    path: ERoutes.ORDER,
    component: OrderPage,
  },
  {
    id: "profile-page",
    path: ERoutes.PROFILE,
    component: ProfilePage,
  },
];
