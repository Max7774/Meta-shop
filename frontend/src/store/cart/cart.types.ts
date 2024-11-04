import { TOrderCartItem } from "@/types/TOrder";
import { TProduct } from "@/types/TProduct";

export interface ICartItem {
  uuid: string;
  product: TProduct;
  quantity: number;
  price: number;
  discount: number;
  inStock: boolean;
  productUuid: string;
  length?: number;
}

export interface ICartInitialState {
  items: ICartItem[];
}

export interface IUpdateItemsInStockPayload {
  itemsInStock: TOrderCartItem[];
}

export interface IChangeQuantityPayload extends Pick<ICartItem, "uuid"> {
  type: "minus" | "plus";
}

export type TypeSize = "SHORT" | "TALL" | "GRANDE" | "VENTI";

export interface IChangeSizePayload extends Pick<ICartItem, "uuid"> {
  size: TypeSize;
}
