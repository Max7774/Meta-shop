import { CATEGORIES } from "@/const/startApi";
import { TCategory } from "@/types/TCategory";
import { instance } from "@api/api.interceptor";

export const CategoryService = {
  async getAll() {
    return await instance<{ categories: TCategory[] }>({
      url: CATEGORIES,
      method: "GET",
    });
  },

  async createCategory(data: { category_name: string }) {
    return await instance<{ category: TCategory }>({
      url: CATEGORIES,
      method: "POST",
      data,
    });
  },

  async deleteCategory(uuid: string) {
    return await instance<TCategory>({
      url: `${CATEGORIES}/${uuid}`,
      method: "DELETE",
    });
  },
};
