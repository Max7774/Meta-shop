import { TCompanyStatistic } from "@/types/TCompanyStatistic";
import { TCompanyState } from "./company.types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addCompany,
  getAllCompanies,
  getProductsStatistics,
} from "./company.actions";

const initialState: TCompanyState = {
  statistic: {} as TCompanyStatistic,
  isLoading: false,
  companies: [],
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
        state.isLoading = true;
      })
      .addCase(addCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tempData = payload;
      })
      .addCase(addCompany.rejected, (state) => {
        state.isLoading = false;
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
      });
  },
});
