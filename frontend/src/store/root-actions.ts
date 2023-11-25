import * as userActions from "./user.slice/user.actions";
import * as profileActions from "./profile.slice/profile.actions";
import { carouselSlice } from "./carousel.slice/carousel.slice";
import * as categoryActions from "./category.slice/category.actions";
import * as productActions from "./products.slice/products.actions";
import { modalSlice } from "./modal.slice/modal.slice";
import { productSlice } from "./products.slice/product.slice";
import { filtersSlice } from "./filters/filters.slice";

export const rootActions = {
  ...carouselSlice.actions,
  ...modalSlice.actions,
  ...productSlice.actions,
  ...filtersSlice.actions,
  ...categoryActions,
  ...userActions,
  ...profileActions,
  ...productActions,
};
