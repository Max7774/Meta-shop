import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductState } from "./product.types";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getProductBySubCategory,
  getProductBySlug,
  getProductsAll,
  updateProduct,
  getAllSoftDeleted,
  recoverProduct,
} from "./product.actions";
import { toast } from "react-toastify";
import { TProduct } from "@/types/TProduct";
import { TCompanyProduct } from "@/types/TCompany";

const productMock: TProduct = {
  images: [],
  description: "",
  unitofmeasurement: "",
  uuid: "",
  name: "",
  createdAt: "",
  peculiarities: "",
  slug: "",
  subcategory: {
    uuid: "",
    name: "",
    slug: "",
    icon: "",
  },
  category: {
    uuid: "",
    name: "",
    slug: "",
  },
  reviews: [],
  isNew: false,
  inStock: false,
  company: [],
};

const initialState: TProductState = {
  isLoading: false,
  isProductLoading: false,
  isProductRecovered: false,
  products: [],
  length: 0,
  selectedCompanyProduct: {} as TCompanyProduct,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<{ uuid: string }>) => {
      state.selectedCompanyProduct =
        state.product?.company.find((el) => el.uuid === action.payload.uuid) ||
        ({} as TCompanyProduct);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAll.pending, (state) => {
        /* ===================== GET PRODUCTS ALL ===================== */
        state.isLoading = true;
      })
      .addCase(getProductsAll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
        state.length = payload.length;
      })
      .addCase(getProductsAll.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(getAllSoftDeleted.pending, (state) => {
        /* ===================== GET ALL SOFT DELETED PRODUCTS ===================== */
        state.isLoading = true;
      })
      .addCase(getAllSoftDeleted.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
        state.length = payload.length;
      })
      .addCase(getAllSoftDeleted.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(getProductBySlug.pending, (state) => {
        /* ===================== GET PRODUCT BY SLUG ===================== */
        state.isLoading = true;
        state.product = productMock as TProduct;
      })
      .addCase(getProductBySlug.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.product = payload;
        state.selectedCompanyProduct =
          payload.company[0] || ({} as TCompanyProduct);
      })
      .addCase(getProductBySlug.rejected, (state) => {
        state.isLoading = false;
        state.product = productMock as TProduct;
      })
      .addCase(getProductBySubCategory.pending, (state) => {
        /* ===================== GET PRODUCT BY CATEGORY ===================== */
        state.isLoading = true;
      })
      .addCase(getProductBySubCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload;
      })
      .addCase(getProductBySubCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createProduct.pending, (state) => {
        /* ===================== CREATE PRODUCT ===================== */
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = [payload, ...state.products];
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        /* ===================== DELETE PRODUCT ===================== */
        state.isProductLoading = true;
      })
      .addCase(
        deleteProduct.fulfilled,
        (
          state,
          {
            payload,
            meta: {
              arg: { type, companyUuid },
            },
          }
        ) => {
          state.isProductLoading = false;
          if (type === "soft" && companyUuid) {
            state.products = state.products.map((el) => {
              if (el.company.some((item) => item.companyUuid === companyUuid)) {
                return {
                  ...el,
                  company: el.company.filter(
                    (el) => el.companyUuid !== companyUuid
                  ),
                };
              }
              return el;
            });
          }
          state.products = state.products.filter(
            (el) => el.uuid !== payload.uuid
          );
        }
      )
      .addCase(deleteProduct.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        /* ===================== UPDATE PRODUCT ===================== */
        state.isProductLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.isProductLoading = false;
        state.product = payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(deleteProductImage.pending, (state) => {
        /* ===================== DELETE PRODUCT IMAGE PRODUCT ===================== */
        state.isProductLoading = true;
      })
      .addCase(deleteProductImage.fulfilled, (state, { payload }) => {
        state.isProductLoading = false;
        toast.success(payload.message);
      })
      .addCase(deleteProductImage.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(recoverProduct.pending, (state) => {
        /* ===================== RECOVER PRODUCT ===================== */
        state.isProductRecovered = true;
      })
      .addCase(recoverProduct.fulfilled, (state, { payload }) => {
        state.isProductRecovered = false;
        state.products = state.products.map((el) => {
          if (el.uuid === payload.uuid) {
            return payload;
          }
          return el;
        });
      })
      .addCase(recoverProduct.rejected, (state) => {
        state.isProductRecovered = false;
      });
  },
});

export const { setSelectedProduct } = productsSlice.actions;
