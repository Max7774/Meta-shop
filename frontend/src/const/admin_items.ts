import { ADMIN_GlOBAL_PREFIX } from "@/const/globalPrefix";

export const ADMIN_SIDEBAR_ITEMS = [
  {
    uuid: "0",
    name: "Пользователи",
    slug: ADMIN_GlOBAL_PREFIX + "users",
  },
  {
    uuid: "1",
    name: "Продукты",
    slug: ADMIN_GlOBAL_PREFIX + "products",
  },
  {
    uuid: "2",
    name: "Категории",
    slug: ADMIN_GlOBAL_PREFIX + "categories",
  },
  {
    uuid: "3",
    name: "Заказы",
    slug: ADMIN_GlOBAL_PREFIX + "orders",
  },
  {
    uuid: "4",
    name: "Заказы в архиве",
    slug: ADMIN_GlOBAL_PREFIX + "archived-orders",
  },
];
