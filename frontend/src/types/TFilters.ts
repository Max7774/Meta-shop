import { ESort } from "@enums/ESort";

export type TFilters = {
  sort?: ESort;
  searchTerm?: string;
  ratings?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryUuid?: string;
  subcategoryUuid?: string;
};

export type TFiltersPages = "order" | "products" | "users";
