import { COMPANY_GlOBAL_PREFIX } from "@/const/globalPrefix";
import {
  FaInfoCircle,
  FaPlus,
  FaChartLine,
  FaClipboardList,
  FaArchive,
  FaTasks,
} from "react-icons/fa";

export const COMPANY_SIDEBAR_ITEMS = [
  {
    uuid: "0",
    name: "Информация о компании",
    slug: COMPANY_GlOBAL_PREFIX + "company-info",
    Icon: FaInfoCircle,
  },
  {
    uuid: "1",
    name: "Добавление продукта",
    slug: COMPANY_GlOBAL_PREFIX + "add-product",
    Icon: FaPlus,
  },
  {
    uuid: "2",
    name: "Статистика",
    slug: COMPANY_GlOBAL_PREFIX + "statistics",
    Icon: FaChartLine,
  },
  {
    uuid: "3",
    name: "Заказы",
    slug: COMPANY_GlOBAL_PREFIX + "orders",
    Icon: FaClipboardList,
  },
  {
    uuid: "4",
    name: "Архив заказов",
    slug: COMPANY_GlOBAL_PREFIX + "archived-orders",
    Icon: FaArchive,
  },
  {
    uuid: "5",
    name: "Массовые операции",
    slug: COMPANY_GlOBAL_PREFIX + "mass-operations",
    Icon: FaTasks,
  },
];
// export const COMPANY_SIDEBAR_ITEMS = [
//   {
//     uuid: "0",
//     name: "Информация о компании",
//     slug: COMPANY_GlOBAL_PREFIX + "company-info",
//   },
//   {
//     uuid: "1",
//     name: "Добавление продукта",
//     slug: COMPANY_GlOBAL_PREFIX + "add-product",
//   },
//   {
//     uuid: "2",
//     name: "Статистика",
//     slug: COMPANY_GlOBAL_PREFIX + "statistics",
//   },
//   {
//     uuid: "3",
//     name: "Заказы",
//     slug: COMPANY_GlOBAL_PREFIX + "orders",
//   },
//   {
//     uuid: "4",
//     name: "Архив заказов",
//     slug: COMPANY_GlOBAL_PREFIX + "archived-orders",
//   },
//   {
//     uuid: "5",
//     name: "Массовые операции",
//     slug: COMPANY_GlOBAL_PREFIX + "mass-operations",
//   },
// ];
