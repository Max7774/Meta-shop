import { ERoles } from "@enums/ERoles";
import { TOrder } from "./TOrder";

export type TAdminUser = {
  uuid: string;
  email: string;
  first_name: string;
  second_name: string;
  avatarPath: string;
  phone_number: string;
  role: ERoles;
  orders: TOrder[];
};
