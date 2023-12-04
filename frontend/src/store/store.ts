import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice/user.slice";
import { profileSlice } from "./profile.slice/profile.slice";
import { carouselSlice } from "./carousel.slice/carousel.slice";
import { categorySlice } from "./category.slice/category.slice";
import { productSlice } from "./products.slice/product.slice";
import { modalSlice } from "./modal.slice/modal.slice";
import { filtersSlice } from "./filters/filters.slice";
import { oneProductSlice } from "./oneProduct.slice/oneProduct.slice";

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  profile: profileSlice.reducer,
  carousel: carouselSlice.reducer,
  category: categorySlice.reducer,
  products: productSlice.reducer,
  modals: modalSlice.reducer,
  filters: filtersSlice.reducer,
  oneProduct: oneProductSlice.reducer,
});

let mainReducer = combinedReducers;

export const store = configureStore({
  reducer: mainReducer,
});

export type TypeRootState = ReturnType<typeof mainReducer>;
// export type AppDispatch = typeof store.dispatch

export default store;
