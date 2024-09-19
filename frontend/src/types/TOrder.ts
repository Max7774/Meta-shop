import { EOrder } from "@enums/EOrder";
import { TProduct } from "./TProduct";

export type TOrderItem = {
  createdAt: string;
  orderUuid: string;
  price: number;
  product: TProduct;
  productUuid: string;
  quantity: number;
  updatedAt: string;
  uuid: string;
};

export type TOrderCartItem = {
  quantity: number;
  price: number;
  productUuid: string;
};

export type TOrder = {
  uuid: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  status: EOrder;
  total: number;
  userUuid: string;
  items: TOrderItem[];
  user?: {
    uuid: string;
    first_name: string;
    second_name: string;
    email: string;
    town: string;
    avatarPath: string;
    phone_number: string;
  };
};

export type TOrderForm = {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  items: TOrderCartItem[];
};
