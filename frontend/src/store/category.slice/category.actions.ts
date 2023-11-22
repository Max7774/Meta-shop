import { IResponseCategory } from "@interfaces/data-interfaces/category.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "@services/main/category.service";

export const getAllCategories = createAsyncThunk<IResponseCategory, unknown>(
  "category/get-all-categories",
  async (_, thunkApi) => {
    try {
      const response = await CategoryService.getAllCategories();
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);
