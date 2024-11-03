import { TCategory } from "@/types/TCategory";

export type TCategoryState = {
  isLoading: boolean;
  isDeleteLoading: boolean;
  categories: TCategory[];
  isSubcategoryLoading: boolean;
  isCategoryEdit: boolean;
};
