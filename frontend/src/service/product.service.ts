import { PRODUCTS } from "@/const/startApi";
import { TFilters } from "@/types/TFilters";
import {
  TProduct,
  TProductCreateForm,
  TProductsResponse,
} from "@/types/TProduct";
import { axiosClassic, formDataInstance, instance } from "@api/api.interceptor";

export const ProductService = {
  async getAll(queryData = {} as TFilters) {
    return await axiosClassic<TProductsResponse>({
      url: PRODUCTS,
      method: "GET",
      params: queryData,
    });
  },

  async getBySlug(slug: string) {
    return await axiosClassic<TProduct>({
      url: `${PRODUCTS}/by-slug/${slug}`,
      method: "GET",
    });
  },

  async getByCategory(categorySlug: string) {
    return await axiosClassic<TProduct[]>({
      url: `${PRODUCTS}/by-category/${categorySlug}`,
      method: "GET",
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
      url: `/file-upload/create/${productUuid}`,
      method: "POST",
      data: formData,
    });
  },

  async deleteProduct(productUuid: string) {
    return await instance<TProduct>({
      url: `${PRODUCTS}/${productUuid}`,
      method: "DELETE",
    });
  },
};
