import { ICategory } from "@interfaces/data-interfaces/category.interface";
import { getAllCategories } from "./category.actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { categories: ICategory[] } = { categories: [] };

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.categories;
    });
  },
});
