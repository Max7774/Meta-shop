import { instance } from "@api/api.interceptor";
import { TypePaginationProducts, TypeProductDataFilters } from "@interfaces/data-interfaces/product.interface";

export const ProductService = {
  async getAll(queryData = {} as TypeProductDataFilters) {
    const { data } = await instance<TypePaginationProducts>({
      url: "products",
      method: "GET",
      params: queryData,
    });

    return data;
  },
};
