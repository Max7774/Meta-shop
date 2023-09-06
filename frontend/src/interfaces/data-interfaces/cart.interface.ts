import { IProduct } from "./product.interface";

export interface ICartItem {
  uuid: string;
  product: IProduct;
  quantity: number;
  price: number;
}
