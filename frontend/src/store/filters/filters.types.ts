import { TFilters, TFiltersPages, TFiltersPagination } from "@/types/TFilters";

export type IFiltersState = {
  [key in TFiltersPages]: {
    isFilterUpdated: boolean;
    queryParams: TFilters;
    pageFilters: TFiltersPagination;
  };
};

export type IFiltersActionsPayload = {
  pageKey: TFiltersPages;
  key: keyof TFilters;
  value: string;
};
