import { ERoles } from "@enums/ERoles";
import { TOrder } from "./TOrder";
import { TAddress } from "./TAddress";

export type TAdminUser = {
  uuid: string;
  createdAt: string;
  email: string;
  first_name: string;
  second_name: string;
  avatarPath: string;
  phone_number: string;
  role: ERoles;
  orders: TOrder[];
  addresses: TAddress[];
  currentAddress: string;
};
