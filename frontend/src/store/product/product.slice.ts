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
  getAllCompanyProducts,
  getSimilarProducts,
} from "./product.actions";
import { toast } from "react-toastify";
import { TProduct } from "@/types/TProduct";
import { getStoreLocal, setLocalStorage } from "@utils/local-storage";

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
  isSimilarLoading: false,
  products: [],
  companyProducts: [],
  similarProducts: [],
  length: 0,
  currentPage: 1,
  selectedCompanyProduct: getStoreLocal("selectedCompany") || "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectCompanyProduct: (state, action: PayloadAction<{ uuid: string }>) => {
      const cp = state.companyProducts.filter(
        (el) => el.companyUuid === action.payload.uuid
      );
      setLocalStorage("selectedCompany", action.payload.uuid);
      state.selectedCompanyProduct = action.payload.uuid;
      state.products = state.products.map((el) => {
        return {
          ...el,
          company: cp.filter((item) => item.productUuid === el.uuid),
        };
      });
      state.product = {
        ...(state.product || ({} as TProduct)),
        company: cp.filter((el) => el.productUuid === state.product?.uuid),
      };
    },
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 1;
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
        state.currentPage += 1;
        if (state.selectedCompanyProduct) {
          state.products = [
            // ...state.products,
            ...payload.products.map((el) => {
              return {
                ...el,
                company: el.company.filter(
                  (el) => el.companyUuid === state.selectedCompanyProduct
                ),
              };
            }),
          ];
        } else {
          state.products = [...state.products, ...payload.products];
        }
        state.length = payload.length;
      })
      .addCase(getProductsAll.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(getSimilarProducts.pending, (state) => {
        /* ===================== GET SIMILAR PRODUCTS ===================== */
        state.isSimilarLoading = true;
      })
      .addCase(getSimilarProducts.fulfilled, (state, { payload }) => {
        state.isSimilarLoading = false;
        if (state.selectedCompanyProduct) {
          state.similarProducts = payload.map((el) => {
            return {
              ...el,
              company: el.company.filter(
                (el) => el.companyUuid === state.selectedCompanyProduct
              ),
            };
          });
        } else {
          state.similarProducts = payload;
        }
        state.length = payload.length;
      })
      .addCase(getSimilarProducts.rejected, (state) => {
        state.isSimilarLoading = false;
        state.similarProducts = [];
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
        state.product = {
          ...payload,
          company: payload.company.filter(
            (el) => el.companyUuid === state.selectedCompanyProduct
          ),
        };
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
        if (state.selectedCompanyProduct) {
          state.products = payload.map((el) => {
            return {
              ...el,
              company: el.company.filter(
                (el) => el.companyUuid === state.selectedCompanyProduct
              ),
            };
          });
        } else {
          state.selectedCompanyProduct =
            getStoreLocal("user")?.companyUuid ||
            payload[0].company[0].companyUuid;
          setLocalStorage(
            "selectedCompany",
            getStoreLocal("user")?.companyUuid ||
              payload[0].company[0].companyUuid
          );
          state.products = payload.map((el) => {
            return {
              ...el,
              company: [el.company[0]],
            };
          });
        }
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
                    (item) => item.companyUuid === companyUuid
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
      })
      .addCase(getAllCompanyProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCompanyProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.companyProducts = payload;
      })
      .addCase(getAllCompanyProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { selectCompanyProduct } = productsSlice.actions;
