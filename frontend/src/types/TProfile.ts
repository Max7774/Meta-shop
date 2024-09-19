import { ERoles } from "@enums/ERoles";

export type TProfile = {
  uuid: string;
  email: string;
  role: ERoles;
  first_name: string;
  second_name: string;
  avatarPath: string;
  phone_number: string;
  town: string;
  favorites: [];
  orders: [];
};
