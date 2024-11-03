import { createSlice } from "@reduxjs/toolkit";
import { TCategoryState } from "./category.types";
import {
  createCategory,
  createSubCategory,
  deleteCategory,
  getAllByCategory,
  getCategoriesAll,
  removeSubCategory,
  updateCategory,
} from "./category.actions";

const initialState: TCategoryState = {
  isLoading: false,
  isDeleteLoading: false,
  isSubcategoryLoading: false,
  isCategoryEdit: false,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesAll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload.categories;
      })
      .addCase(getCategoriesAll.rejected, (state) => {
        state.isLoading = false;
        state.categories = [];
      })
      .addCase(updateCategory.pending, (state) => {
        state.isCategoryEdit = true;
      })
      .addCase(
        updateCategory.fulfilled,
        (
          state,
          {
            payload,
            meta: {
              arg: { uuid },
            },
          }
        ) => {
          state.isCategoryEdit = false;
          state.categories = [
            payload,
            ...state.categories.filter((el) => el.uuid !== uuid),
          ];
        }
      )
      .addCase(updateCategory.rejected, (state) => {
        state.isCategoryEdit = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = [...state.categories, payload.category];
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isDeleteLoading = false;
        state.categories = state.categories.filter(
          (el) => el.uuid !== payload.uuid
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(createSubCategory.pending, (state) => {
        state.isSubcategoryLoading = true;
        state.isLoading = true;
      })
      .addCase(
        createSubCategory.fulfilled,
        (state, { payload: subcategory }) => {
          state.isSubcategoryLoading = false;
          state.isLoading = false;
          console.log(subcategory);
          state.categories = state.categories.map((category) => {
            if (category.uuid === subcategory.categoryUuid) {
              console.log("test");
              return {
                ...category,
                subcategory: [...category.subcategory, subcategory],
              };
            }
            return category;
          });
        }
      )
      .addCase(createSubCategory.rejected, (state) => {
        state.isSubcategoryLoading = false;
        state.isLoading = false;
      })
      .addCase(removeSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeSubCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = state.categories.map((category) => {
          if (category.uuid === payload.categoryUuid) {
            return {
              ...category,
              subcategory: category.subcategory.filter(
                (subcategory) => subcategory.uuid !== payload.uuid
              ),
            };
          }
          return category;
        });
      })
      .addCase(removeSubCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllByCategory.pending, (state) => {
        state.isSubcategoryLoading = true;
      })
      .addCase(getAllByCategory.fulfilled, (state, { payload }) => {
        state.isSubcategoryLoading = false;
        state.categories = state.categories.map((category) => {
          if (category.uuid === payload.categoryUuid) {
            return {
              ...category,
              subcategory: [...payload.subcategories],
            };
          }
          return category;
        });
      })
      .addCase(getAllByCategory.rejected, (state) => {
        state.isSubcategoryLoading = false;
      });
  },
});
