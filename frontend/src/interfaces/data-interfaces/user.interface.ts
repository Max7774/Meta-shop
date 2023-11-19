import { UserRoles, UserType } from "types/user.type";
import { IProduct } from "./product.interface";
import { IOrder } from "./order.interface";

export interface IUser {
  uuid: string;
  email: string;
  first_name: string;
  avatarPath: string;
  phone: string;
  role?: UserRoles;
  createdAt?: string;
}

export interface IProfileUser {
  profile: {
    favorites: IProduct[];
    orders: IOrder[];
    user: IUser;
  };
  isLoading?: boolean;
}

export interface IProfileUserFromBackend extends IUser {
  favorites: IProduct[];
  orders: IOrder[];
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends ITokens {
  user: UserType;
}

export interface IRegisterResponse extends ITokens {
  user: UserType["user"];
}
