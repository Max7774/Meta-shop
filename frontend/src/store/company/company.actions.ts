/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyService } from "@/service/company.service";
import { TAddCompany } from "@/types/TAddCompany";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsStatistics = createAsyncThunk(
  "/company/statistic",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getProductsStatistics();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCompany = createAsyncThunk<
  { email: string; password: string },
  TAddCompany
>("/company", async (data, { rejectWithValue }) => {
  try {
    const response = await CompanyService.addCompany(data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
