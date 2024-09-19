import * as userActions from "./user/user.actions";
import * as categoryActions from "./category/category.actions";
import * as productActions from "./product/product.actions";
import { cartSlice } from "./cart/cart.slice";
import * as ordersActions from "./orders/orders.actions";
import { filtersSlice } from "./filters/filters.slice";

export const rootActions = {
  ...userActions,
  ...categoryActions,
  ...productActions,
  ...cartSlice.actions,
  ...filtersSlice.actions,
  ...ordersActions,
};
