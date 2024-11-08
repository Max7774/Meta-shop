/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyService } from "@/service/company.service";
import { TAddCompany } from "@/types/TAddCompany";
import { TCompany, TCompanyInfo, TEditCompany } from "@/types/TCompany";
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
  { email: string; password: string; uuid: string },
  TAddCompany
>("/company", async (data, { rejectWithValue }) => {
  try {
    const response = await CompanyService.addCompany(data);

    if (data.logoPath) {
      await CompanyService.updateCompanyLogo(response.data.uuid, data.logoPath);
    }

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

export const deleteCompany = createAsyncThunk<
  TCompany,
  { uuid: string; userUuid: string }
>("/delete-company", async ({ uuid, userUuid }, { rejectWithValue }) => {
  try {
    const response = await CompanyService.deleteCompany(uuid, userUuid);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getCompanyInfo = createAsyncThunk<TCompanyInfo, undefined>(
  "/company/info",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getCompanyInfo();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCompanyInfo = createAsyncThunk<TCompanyInfo, TEditCompany>(
  "/company/edit-info",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CompanyService.editCompanyInfo(data);

      if (data.logoPath) {
        await CompanyService.updateCompanyLogo(
          response.data.uuid,
          data.logoPath
        );
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
