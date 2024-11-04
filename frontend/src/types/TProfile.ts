import { ERoles } from "@enums/ERoles";
import { TAddress } from "./TAddress";
import { TProfileOrderItem } from "./TOrder";

export type TProfile = {
  uuid: string;
  companyUuid: string;
  email: string;
  role: ERoles;
  first_name: string;
  second_name: string;
  avatarPath: string;
  phone_number: string;
  currentAddress: string;
  favorites: [];
  orders: TProfileOrderItem[];
  addresses: TAddress[];
  verified: boolean;
};

export type TProfileEdit = {
  email: string;
  first_name: string;
  second_name: string;
  avatarPath: string;
  phone_number: string;
};
