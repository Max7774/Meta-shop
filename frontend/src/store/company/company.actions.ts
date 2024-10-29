/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyService } from "@/service/company.service";
import { TAddCompany } from "@/types/TAddCompany";
import { TCompany } from "@/types/TCompany";
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

export const getAllCompanies = createAsyncThunk<TCompany[], undefined>(
  "/gat-all-companies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getAllCompanies();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompany = createAsyncThunk<TCompany, string>(
  "/delete-company",
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await CompanyService.deleteCompany(uuid);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);