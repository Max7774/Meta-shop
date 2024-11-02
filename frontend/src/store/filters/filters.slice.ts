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
  },
  products: {
    isFilterUpdated: false,
    queryParams: {
      searchTerm: "",
      sort: ESort.NEWEST,
    },
  },
  users: {
    isFilterUpdated: false,
    queryParams: {
      searchTerm: "",
      sort: ESort.NEWEST,
    },
  },
  "soft-deleted": {
    isFilterUpdated: false,
    queryParams: {
      searchTerm: "",
      sort: ESort.NEWEST,
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
    resetFilterUpdate: (
      state,
      action: PayloadAction<{ pageKey: TFiltersPages }>
    ) => {
      state[action.payload.pageKey].isFilterUpdated = false;
    },
  },
});
