/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CompanyService } from "@/service/company.service";
import { ProductService } from "@/service/product.service";
import { TCompanyProduct } from "@/types/TCompany";
import { AsyncThunkConfig } from "@/types/TError";
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

/* getAllSoftDeleted */
export const getAllSoftDeleted = createAsyncThunk<TProductsResponse, TFilters>(
  "products/getAllSoftDeleted",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await ProductService.getAllSoftDeleted(filters);
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

/* getProductBySubCategory */
export const getProductBySubCategory = createAsyncThunk<TProduct[], string>(
  "products/getProductBySubCategory",
  async (subcategorySlug, { rejectWithValue }) => {
    try {
      const response = await ProductService.getBySubCategory(subcategorySlug);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to fetch product by slug",
      });
    }
  }
);

/* createProduct */
export const createProduct = createAsyncThunk<
  TProduct,
  TProductCreateForm,
  AsyncThunkConfig<{ errorMessage: string; data: any }>
>("products/createProduct", async (product, { rejectWithValue }) => {
  try {
    const currentProduct = {
      name: product.name,
      price: product.price++,
      description: product.description,
      subcategoryUuid: product.subcategoryUuid,
      discount: product.discount++,
      inStock: product.inStock,
      unitofmeasurement: product.unitofmeasurement,
      companyUuid: product.companyUuid,
      categoryUuid: product.categoryUuid,
    };
    const response = await ProductService.createProduct(currentProduct);

    for (let index = 0; index < (product.images || []).length; index++) {
      const element = (product.images || [])[index];
      await ProductService.uploadProductImages(response.data.uuid, element);
    }

    return response.data;
  } catch (error: any) {
    console.log("ERROR", error.response.data);
    return rejectWithValue({
      data: error.response.data,
      errorMessage: "Failed to create product",
    });
  }
});

/* deleteProduct */
export const deleteProduct = createAsyncThunk<
  TProduct,
  { uuid: string; type: "soft" | "hard"; companyUuid?: string }
>("products/deleteProduct", async ({ uuid, type }, { rejectWithValue }) => {
  try {
    const response = await ProductService.deleteProduct(uuid, type);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      errorMessage: "Failed to delete product",
    });
  }
});

/* updateProduct */
export const updateProduct = createAsyncThunk<
  TProduct,
  { data: TProductCreateForm; uuid: string; images: File[] }
>(
  "products/updateProduct",
  async ({ data, uuid, images }, { rejectWithValue }) => {
    try {
      const response = await ProductService.updateProduct(data, uuid);

      if (images.length !== 0) {
        for (let index = 0; index < (images || []).length; index++) {
          const element = (images || [])[index];
          await ProductService.uploadProductImages(response.data.uuid, element);
        }
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to update product",
      });
    }
  }
);

/* deleteProductImage */
export const deleteProductImage = createAsyncThunk<
  { message: string },
  { productUuid: string; filename: string }
>(
  "products/deleteProductImage",
  async ({ productUuid, filename }, { rejectWithValue }) => {
    try {
      const response = await ProductService.deleteProductImage(
        productUuid,
        filename
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to delete product image",
      });
    }
  }
);

/* recoverProduct */
export const recoverProduct = createAsyncThunk<TProduct, string>(
  "products/recoverProduct",
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ProductService.recoverProduct(uuid);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: "Failed to recover product",
      });
    }
  }
);

export const getAllCompanyProducts = createAsyncThunk<
  TCompanyProduct[],
  undefined
>("/company/products", async (_, { rejectWithValue }) => {
  try {
    const response = await CompanyService.getAllCompanyProducts();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
