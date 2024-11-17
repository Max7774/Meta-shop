import { TCategory } from "@/types/TCategory";
import { FaHome, FaPhone } from "react-icons/fa";

export const sideBarItems: TCategory[] = [
  {
    uuid: "0",
    slug: "/about",
    name: "О нас",
    icon: FaHome,
    subcategory: [],
  },
  {
    uuid: "1",
    slug: "/contacts",
    name: "Контакты",
    icon: FaPhone,
    subcategory: [],
  },
];
