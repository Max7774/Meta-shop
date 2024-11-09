import { EOrder } from "@enums/EOrder";
import { TProduct } from "./TProduct";
import { TAddress } from "./TAddress";

export type TOrderItem = {
  createdAt: string;
  orderUuid: string;
  price: number;
  inStock: boolean;
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
  inStock: boolean;
};

export type TOrder = {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  comment: string;
  total: number;
  status: EOrder;
  address: TAddress;
  userUuid: string;
  isDelivery: boolean;
  isActual: boolean;
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

export type TProfileOrderItem = {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  comment: string;
  total: number;
  status: EOrder;
  addressUuid: string;
  userUuid: string;
};

export type TOrderForm = {
  comment: string;
  addressUuid: string;
  companyUuid: string;
  items: TOrderCartItem[];
};
