import { TCompanyStatistic } from "@/types/TCompanyStatistic";
import { TCompanyState } from "./company.types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addCompany,
  deleteCompany,
  editCompanyInfo,
  getAllCompanies,
  getCompanyInfo,
  getProductsStatistics,
} from "./company.actions";
import { TCompanyInfo } from "@/types/TCompany";

const initialState: TCompanyState = {
  statistic: {} as TCompanyStatistic,
  isLoading: false,
  isDeleteLoading: false,
  isAddingLoading: false,
  isEditLoading: false,
  companyProducts: [],
  companies: [],
  info: {} as TCompanyInfo,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsStatistics.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.statistic = payload;
      })
      .addCase(getProductsStatistics.rejected, (state) => {
        state.isLoading = false;
        state.statistic = {} as TCompanyStatistic;
      })
      .addCase(addCompany.pending, (state) => {
        state.isAddingLoading = true;
      })
      .addCase(addCompany.fulfilled, (state, { payload }) => {
        state.isAddingLoading = false;
        state.tempData = payload;
      })
      .addCase(addCompany.rejected, (state) => {
        state.isAddingLoading = false;
      })
      .addCase(getAllCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.companies = payload;
      })
      .addCase(getAllCompanies.rejected, (state) => {
        state.isLoading = false;
        state.companies = [];
      })
      .addCase(deleteCompany.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.isDeleteLoading = false;
        state.companies = state.companies.filter(
          (company) => company.uuid !== payload.uuid
        );
      })
      .addCase(deleteCompany.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(getCompanyInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.info = payload;
      })
      .addCase(getCompanyInfo.rejected, (state) => {
        state.isLoading = false;
        state.info = {} as TCompanyInfo;
      })
      .addCase(editCompanyInfo.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editCompanyInfo.fulfilled, (state, { payload }) => {
        state.isEditLoading = false;
        state.info = payload;
      })
      .addCase(editCompanyInfo.rejected, (state) => {
        state.isEditLoading = false;
        state.info = {} as TCompanyInfo;
      });
  },
});
