import * as userActions from "./user/user.actions";
import * as categoryActions from "./category/category.actions";
import * as productActions from "./product/product.actions";
import { cartSlice } from "./cart/cart.slice";
import * as ordersActions from "./orders/orders.actions";
import * as companyActions from "./company/company.actions";
import { filtersSlice } from "./filters/filters.slice";
import { productsSlice } from "./product/product.slice";
import * as claimActions from "./claim/claim.actions";

export const rootActions = {
  ...userActions,
  ...categoryActions,
  ...productActions,
  ...cartSlice.actions,
  ...filtersSlice.actions,
  ...ordersActions,
  ...companyActions,
  ...productsSlice.actions,
  ...claimActions,
};
