import { TFilters, TFiltersPages } from "@/types/TFilters";

export type IFiltersState = {
  [key in TFiltersPages]: {
    isFilterUpdated: boolean;
    queryParams: TFilters;
  };
};

export type IFiltersActionsPayload = {
  pageKey: TFiltersPages;
  key: keyof TFilters;
  value: string;
};
