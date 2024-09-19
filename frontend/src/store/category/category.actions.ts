/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryService } from "@/service/category.service";
import { TCategory } from "@/types/TCategory";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategoriesAll = createAsyncThunk(
  "/get-category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CategoryService.getAll();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk<
  { category: TCategory },
  { category_name: string }
>("/create-category", async (data, { rejectWithValue }) => {
  try {
    const response = await CategoryService.createCategory(data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteCategory = createAsyncThunk<TCategory, string>(
  "/delete-category",
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await CategoryService.deleteCategory(uuid);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
