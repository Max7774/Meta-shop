import { ICartItem } from "./cart.interface";
import { IUser } from "./user.interface";

export enum EnumOrderStatus {
  Pending = "PENDING",
  Payed = "PAYED",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}

export interface IOrder {
  uuid: string;
  createdAt: string;
  items: ICartItem[];
  status: EnumOrderStatus;
  user: IUser;
  total: number;
}
