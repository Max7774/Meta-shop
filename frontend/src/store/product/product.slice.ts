import { createSlice } from "@reduxjs/toolkit";
import { TProductState } from "./product.types";
import {
  createProduct,
  deleteProduct,
  getProductByCategory,
  getProductBySlug,
  getProductsAll,
} from "./product.actions";

const initialState: TProductState = {
  isLoading: false,
  isProductLoading: false,
  products: [],
  length: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAll.pending, (state) => {
        /* ===================== GET PRODUCTS ALL ===================== */
        state.isLoading = true;
      })
      .addCase(getProductsAll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
        state.length = payload.length;
      })
      .addCase(getProductsAll.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(getProductBySlug.pending, (state) => {
        /* ===================== GET PRODUCT BY SLUG ===================== */
        state.isLoading = true;
      })
      .addCase(getProductBySlug.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.product = payload;
      })
      .addCase(getProductBySlug.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProductByCategory.pending, (state) => {
        /* ===================== GET PRODUCT BY CATEGORY ===================== */
        state.isLoading = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload;
      })
      .addCase(getProductByCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createProduct.pending, (state) => {
        /* ===================== CREATE PRODUCT ===================== */
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = [payload, ...state.products];
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        /* ===================== DELETE PRODUCT ===================== */
        state.isProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.isProductLoading = false;
        state.products = state.products.filter(
          (el) => el.uuid !== payload.uuid
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isProductLoading = false;
      });
  },
});
