import { ProductService } from "@/service/product.service";
import { TFilters } from "@/types/TFilters";
import {
  TProduct,
  TProductCreateForm,
  TProductsResponse,
} from "@/types/TProduct";
import { createAsyncThunk } from "@reduxjs/toolkit";

/* getProductsAll */
export const getProductsAll = createAsyncThunk<TProductsResponse, TFilters>(
  "products/getProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await ProductService.getAll(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to fetch product by id",
      });
    }
  }
);

/* getProductBySlug */
export const getProductBySlug = createAsyncThunk<TProduct, string>(
  "products/getProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await ProductService.getBySlug(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to fetch product by slug",
      });
    }
  }
);

/* getProductByCategory */
export const getProductByCategory = createAsyncThunk<TProduct[], string>(
  "products/getProductByCategory",
  async (categorySlug, { rejectWithValue }) => {
    try {
      const response = await ProductService.getByCategory(categorySlug);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to fetch product by slug",
      });
    }
  }
);

/* createProduct */
export const createProduct = createAsyncThunk<TProduct, TProductCreateForm>(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const currentProduct = {
        name: product.name,
        price: product.price++,
        description: product.description,
        categoryUuid: product.categoryUuid,
        peculiarities: product.peculiarities,
        quantity: product.quantity++,
        discount: product.discount++,
      };
      const response = await ProductService.createProduct(currentProduct);

      for (let index = 0; index < (product.images || []).length; index++) {
        const element = (product.images || [])[index];
        await ProductService.uploadProductImages(response.data.uuid, element);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to create product",
      });
    }
  }
);

/* deleteProduct */
export const deleteProduct = createAsyncThunk<TProduct, string>(
  "products/deleteProduct",
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ProductService.deleteProduct(uuid);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to delete product",
      });
    }
  }
);
