/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryService } from "@/service/category.service";
import { TCategory, TCreateSubCategory, TSubCategory } from "@/types/TCategory";
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

export const createSubCategory = createAsyncThunk<
  TSubCategory,
  TCreateSubCategory
>("/create-subcategory", async (data, { rejectWithValue }) => {
  try {
    const response = await CategoryService.createSubCategory(data);

    console.log(data.icon);

    if (data.icon) {
      await CategoryService.createIconSubcategory(
        response.data.uuid,
        data.icon
      );
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const removeSubCategory = createAsyncThunk<TSubCategory, string>(
  "/remove-subcategory",
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await CategoryService.removeSubCategory(uuid);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllByCategory = createAsyncThunk<
  {
    categoryUuid: string;
    subcategories: TSubCategory[];
  },
  string
>("/get-all-by-category", async (categoryUuid, { rejectWithValue }) => {
  try {
    const response = await CategoryService.getAllByCategory(categoryUuid);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateCategory = createAsyncThunk<
  TCategory,
  { uuid: string; category_name: string }
>("/update-category", async (data, { rejectWithValue }) => {
  try {
    const response = await CategoryService.updateCategory(data.uuid, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
