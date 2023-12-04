import { IProduct } from "@interfaces/data-interfaces/product.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "@services/main/product.service";

export const getOneProduct = createAsyncThunk<IProduct, string>(
  "oneProduct/get-one-product",
  async (data, thunkApi) => {
    try {
      const response = await ProductService.getBySlug(data);

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);
