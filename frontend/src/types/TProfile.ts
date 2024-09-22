import { ERoles } from "@enums/ERoles";
import { TAddress } from "./TAddress";
import { TProfileOrderItem } from "./TOrder";

export type TProfile = {
  uuid: string;
  email: string;
  role: ERoles;
  first_name: string;
  second_name: string;
  avatarPath: string;
  phone_number: string;
  town: string;
  currentAddress: string;
  favorites: [];
  orders: TProfileOrderItem[];
  addresses: TAddress[];
};
