import { instance } from "@api/api.interceptor";
import {
  TypePaginationProducts,
  TypeProductDataFilters,
} from "@interfaces/data-interfaces/product.interface";

export const ProductService = {
  async getAll(queryData = {} as TypeProductDataFilters) {
    const response = await instance<TypePaginationProducts>({
      url: "products",
      method: "GET",
      params: queryData,
    });

    return response.data;
  },

  async getBySlug(slug: string) {
    const response = await instance({
      url: `products/by-slug/${slug}`,
      method: "GET",
    });

    return response.data;
  },
};
