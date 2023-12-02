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

    console.log(response.request.responseURL);

    return response.data;
  },
};
