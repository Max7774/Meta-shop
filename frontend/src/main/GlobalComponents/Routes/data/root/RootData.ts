import { TRoutes } from "@/types/TRoutesData";
import { ERoutes } from "@enums/ERoutes";
import {
  About,
  ArchivedOrders,
  Contacts,
  MainPage,
  OrderPage,
  ProductPage,
  ProfilePage,
  Receipt,
  SubCategories,
  SubCategoriesProducts,
  UserOrders,
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
  {
    id: "user-order-page",
    path: ERoutes.ORDERS,
    component: UserOrders,
  },
  {
    id: "about-page",
    path: ERoutes.ABOUT,
    component: About,
  },
  {
    id: "contacts-page",
    path: ERoutes.CONTACTS,
    component: Contacts,
  },
  {
    id: "receipt-page",
    path: ERoutes.RECEIPT,
    component: Receipt,
  },
  {
    id: "archived-orders-root-page",
    path: ERoutes.ARCHIVED_ORDERS,
    component: ArchivedOrders,
  },
];
