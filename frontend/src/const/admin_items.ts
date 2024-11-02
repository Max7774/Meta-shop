import { ADMIN_GlOBAL_PREFIX } from "@/const/globalPrefix";

export const ADMIN_SIDEBAR_ITEMS = [
  {
    uuid: "0",
    name: "Пользователи",
    slug: ADMIN_GlOBAL_PREFIX + "users",
  },
  {
    uuid: "1",
    name: "Категории",
    slug: ADMIN_GlOBAL_PREFIX + "categories",
  },
  {
    uuid: "2",
    name: "Заказы",
    slug: ADMIN_GlOBAL_PREFIX + "orders",
  },
  {
    uuid: "3",
    name: "Заказы в архиве",
    slug: ADMIN_GlOBAL_PREFIX + "archived-orders",
  },
  {
    uuid: "4",
    name: "Добавить фирму",
    slug: ADMIN_GlOBAL_PREFIX + "add-company",
  },
  {
    uuid: "5",
    name: "Удаленные продукты",
    slug: ADMIN_GlOBAL_PREFIX + "soft-deleted",
  },
];
