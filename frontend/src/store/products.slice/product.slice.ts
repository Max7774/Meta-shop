import { IProduct } from "@interfaces/data-interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, searchProducts } from "./products.actions";

const initialState: { products: IProduct[]; searchResults?: string[] } = {
  products: [],
  searchResults: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload.products;
    });
    builder.addCase(searchProducts.pending, (state, { payload}) => {
      state.searchResults = [];
    });
    builder.addCase(searchProducts.fulfilled, (state, { payload}) => {
      state.searchResults = payload.products.map((el) => el.name);
    });
  },
});
