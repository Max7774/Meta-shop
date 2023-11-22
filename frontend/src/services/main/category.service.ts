import { instance } from "@api/api.interceptor";
import { IResponseCategory } from "@interfaces/data-interfaces/category.interface";

export const CategoryService = {
  async getAllCategories() {
    const response = await instance<IResponseCategory>({
      url: "categories",
      method: "GET",
    });

    return response.data;
  },
};
