import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./user/user.slice";
import { categorySlice } from "./category/category.slice";
import { productsSlice } from "./product/product.slice";
import { cartSlice } from "./cart/cart.slice";
import { filtersSlice } from "./filters/filters.slice";
import { ordersSlice } from "./orders/orders.slice";
import { companySlice } from "./company/company.slice";

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  category: categorySlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
  filters: filtersSlice.reducer,
  orders: ordersSlice.reducer,
  company: companySlice.reducer,
});

const mainReducer = combinedReducers;

export const store = configureStore({
  reducer: mainReducer,
});

export type TypeRootState = ReturnType<typeof mainReducer>;

export default store;
