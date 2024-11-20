import { FILE_UPLOAD, PRODUCTS } from "@/const/startApi";
import { TFilters, TFiltersPagination } from "@/types/TFilters";
import {
  TProduct,
  TProductCreateForm,
  TProductsResponse,
} from "@/types/TProduct";
import { axiosClassic, formDataInstance, instance } from "@api/api.interceptor";

export const ProductService = {
  async getAll(
    queryData = {} as TFilters,
    pageData = {} as TFiltersPagination
  ) {
    return await axiosClassic<TProductsResponse>({
      url: PRODUCTS,
      method: "GET",
      params: { ...queryData, ...pageData },
    });
  },

  async getAllSoftDeleted(
    queryData = {} as TFilters,
    pageData = {} as TFiltersPagination
  ) {
    return await instance<TProductsResponse>({
      url: `${PRODUCTS}/soft-deleted`,
      method: "GET",
      params: { ...queryData, ...pageData },
    });
  },

  async getBySlug(slug: string) {
    return await axiosClassic<TProduct>({
      url: `${PRODUCTS}/by-slug/${slug}`,
      method: "GET",
    });
  },

  async getSimilarProducts(
    uuid: string,
    companyUuid: string,
    queryData = {} as TFilters,
    pageData = {} as TFiltersPagination
  ) {
    return await axiosClassic<TProduct[]>({
      url: `${PRODUCTS}/similar/${uuid}/${companyUuid}`,
      method: "GET",
      params: { ...queryData, ...pageData },
    });
  },

  async getBySubCategory(
    subcategorySlug: string,
    queryData = {} as TFilters,
    pageData = {} as TFiltersPagination
  ) {
    return await axiosClassic<TProductsResponse>({
      url: `${PRODUCTS}/by-subcategory/${subcategorySlug}`,
      method: "GET",
      params: { ...queryData, ...pageData },
    });
  },

  async createProduct(data: TProductCreateForm) {
    return await instance<TProduct>({
      url: `${PRODUCTS}/create`,
      method: "POST",
      data,
    });
  },

  async uploadProductImages(productUuid: string, image: File) {
    const formData = new FormData();
    formData.append("files", image);

    return await formDataInstance<string[]>({
      url: `${FILE_UPLOAD}/create/${productUuid}`,
      method: "POST",
      data: formData,
    });
  },

  async deleteProduct(productUuid: string, type: "soft" | "hard") {
    return await instance<TProduct>({
      url: `${PRODUCTS}/${productUuid}/${type}`,
      method: "DELETE",
    });
  },

  async updateProduct(data: TProductCreateForm, productUuid: string) {
    return await instance<TProduct>({
      url: `${PRODUCTS}/${productUuid}`,
      method: "PUT",
      data,
    });
  },

  async deleteProductImage(productUuid: string, filename: string) {
    return await instance<{ message: string }>({
      url: `${FILE_UPLOAD}/${filename}/${productUuid}`,
      method: "DELETE",
    });
  },

  async recoverProduct(productUuid: string) {
    return await instance<TProduct>({
      url: `${PRODUCTS}/recover/${productUuid}`,
      method: "GET",
    });
  },
};
