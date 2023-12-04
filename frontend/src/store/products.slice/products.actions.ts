import {
  TypePaginationProducts,
  TypeProductDataFilters,
} from "@interfaces/data-interfaces/product.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "@services/main/product.service";

export const getAllProducts = createAsyncThunk<
  TypePaginationProducts,
  TypeProductDataFilters
>(
  "products/get-all",
  async (data = { page: 1, perPage: 4, ratings: "" }, thunkApi) => {
    try {
      const response = await ProductService.getAll(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

export const searchProducts = createAsyncThunk<
  TypePaginationProducts,
  TypeProductDataFilters
>("products/search", async (data, thunkApi) => {
  try {
    const response = await ProductService.getAll(data);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error.response.data.message || "Unknown error"
    );
  }
});
