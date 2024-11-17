import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFiltersActionsPayload, IFiltersState } from "./filters.types";
import { ESort } from "@enums/ESort";
import { TFiltersPages } from "@/types/TFilters";

const initialState: IFiltersState = {
  order: {
    isFilterUpdated: false,
    queryParams: {
      searchTerm: "",
    },
    pageFilters: {
      perPage: 10,
      page: 1,
    },
  },
  products: {
    isFilterUpdated: false,
    queryParams: {
      searchTerm: "",
      sort: ESort.NEWEST,
    },
    pageFilters: {
      perPage: 10,
      page: 1,
    },
  },
  users: {
    isFilterUpdated: false,
    queryParams: {
      searchTerm: "",
      sort: ESort.NEWEST,
    },
    pageFilters: {
      perPage: 10,
      page: 1,
    },
  },
  "soft-deleted": {
    isFilterUpdated: false,
    queryParams: {
      searchTerm: "",
      sort: ESort.NEWEST,
    },
    pageFilters: {
      perPage: 10,
      page: 1,
    },
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateQueryParam: (
      state,
      action: PayloadAction<IFiltersActionsPayload>
    ) => {
      const { key, value } = action.payload;
      if (key === "sort") {
        state[action.payload.pageKey].queryParams[key] = value as ESort;
      } else {
        state[action.payload.pageKey].queryParams[key] = value;
      }
      state[action.payload.pageKey].isFilterUpdated = true;
    },
    updatePageFilters: (
      state,
      action: PayloadAction<{
        pageKey: TFiltersPages;
        perPage: number;
        // page: number;
      }>
    ) => {
      const { pageKey, perPage } = action.payload;
      state[pageKey].pageFilters.perPage = perPage;
      // state[pageKey].pageFilters.page = page;
      state[pageKey].isFilterUpdated = true;
    },
    resetFilterUpdate: (
      state,
      action: PayloadAction<{ pageKey: TFiltersPages }>
    ) => {
      state[action.payload.pageKey].isFilterUpdated = false;
    },
  },
});
