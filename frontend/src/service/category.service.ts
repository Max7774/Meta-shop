import { CATEGORIES, FILE_UPLOAD, SUBCATEGORY } from "@/const/startApi";
import { TCategory, TCreateSubCategory, TSubCategory } from "@/types/TCategory";
import { formDataInstance, instance } from "@api/api.interceptor";

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

  async createSubCategory(data: TCreateSubCategory) {
    return await instance<TSubCategory>({
      url: SUBCATEGORY,
      method: "POST",
      data,
    });
  },

  async removeSubCategory(subcategoryUuid: string) {
    return await instance<TSubCategory>({
      url: `${SUBCATEGORY}/${subcategoryUuid}`,
      method: "DELETE",
    });
  },

  async createIconSubcategory(subcategoryUuid: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return await formDataInstance<{ message: string }>({
      url: `${FILE_UPLOAD}/create/subcategory/icon/${subcategoryUuid}`,
      method: "POST",
      data: formData,
    });
  },

  async getAllByCategory(categoryUuid: string) {
    return await instance<{
      categoryUuid: string;
      subcategories: TSubCategory[];
    }>({
      url: `${SUBCATEGORY}/${categoryUuid}`,
      method: "GET",
    });
  },
};
