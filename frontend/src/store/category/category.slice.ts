import { createSlice } from "@reduxjs/toolkit";
import { TCategoryState } from "./category.types";
import {
  createCategory,
  deleteCategory,
  getCategoriesAll,
} from "./category.actions";

const initialState: TCategoryState = {
  isLoading: false,
  isDeleteLoading: false,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesAll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload.categories;
      })
      .addCase(getCategoriesAll.rejected, (state) => {
        state.isLoading = false;
        state.categories = [];
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = [...state.categories, payload.category];
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isDeleteLoading = false;
        state.categories = state.categories.filter(
          (el) => el.uuid !== payload.uuid
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isDeleteLoading = false;
      });
  },
});
