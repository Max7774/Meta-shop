import { ADMIN_GlOBAL_PREFIX } from "@/const/globalPrefix";
import {
  FaUsers,
  FaTags,
  FaPlusSquare,
  FaBox,
  FaArchive,
  FaBuilding,
  FaTrash,
  FaClipboardList,
  FaCogs,
} from "react-icons/fa";

export const ADMIN_SIDEBAR_ITEMS = [
  {
    uuid: "0",
    name: "Пользователи",
    slug: ADMIN_GlOBAL_PREFIX + "users",
    Icon: FaUsers,
  },
  {
    uuid: "1",
    name: "Категории",
    slug: ADMIN_GlOBAL_PREFIX + "categories",
    Icon: FaTags,
  },
  {
    uuid: "2",
    name: "Добавление продукта",
    slug: ADMIN_GlOBAL_PREFIX + "add-product",
    Icon: FaPlusSquare,
  },
  {
    uuid: "3",
    name: "Заказы",
    slug: ADMIN_GlOBAL_PREFIX + "orders",
    Icon: FaBox,
  },
  {
    uuid: "4",
    name: "Заказы в архиве",
    slug: ADMIN_GlOBAL_PREFIX + "archived-orders",
    Icon: FaArchive,
  },
  {
    uuid: "5",
    name: "Добавить фирму",
    slug: ADMIN_GlOBAL_PREFIX + "add-company",
    Icon: FaBuilding,
  },
  {
    uuid: "6",
    name: "Удаленные продукты",
    slug: ADMIN_GlOBAL_PREFIX + "soft-deleted",
    Icon: FaTrash,
  },
  {
    uuid: "7",
    name: "Заявки",
    slug: ADMIN_GlOBAL_PREFIX + "claims",
    Icon: FaClipboardList,
  },
  {
    uuid: "8",
    name: "Массовые операции",
    slug: ADMIN_GlOBAL_PREFIX + "mass-operations",
    Icon: FaCogs,
  },
];
