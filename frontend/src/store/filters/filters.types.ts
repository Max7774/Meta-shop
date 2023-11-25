import { TypeProductDataFilters } from "@interfaces/data-interfaces/product.interface";

export interface IFiltersState {
  isFilterUpdated: boolean;
  queryParams: TypeProductDataFilters;
}

export interface IFiltersActionsPayload {
  key: keyof TypeProductDataFilters;
  value: string;
}

export enum EnumProductSort {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest",
}
