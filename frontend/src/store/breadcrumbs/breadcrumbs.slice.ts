import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IBreadcrumb = {
  path: string;
  title: string;
};

type IBreadcrumbsState = {
  breadcrumbs: IBreadcrumb[];
};

const initialState: IBreadcrumbsState = {
  breadcrumbs: [],
};

export const breadcrumbSlice = createSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {
    setBreadCrumbs: (state, action: PayloadAction<IBreadcrumb>) => {
      const existingIndex = state.breadcrumbs.findIndex(
        (breadcrumb) => breadcrumb.path === action.payload.path
      );

      if (existingIndex !== -1) {
        state.breadcrumbs = state.breadcrumbs.slice(0, existingIndex + 1);
      } else {
        state.breadcrumbs.push(action.payload);
      }
    },
    resetBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },
  },
});

export const { setBreadCrumbs } = breadcrumbSlice.actions;
