/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClaimsService } from "@/service/calims.service";
import { TClaim, TCreateClaim } from "@/types/TClaim";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createClaim = createAsyncThunk<TCreateClaim, TCreateClaim>(
  "/create-claim",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ClaimsService.create(data);
      toast.success("Ваша заявка успешно отправлена!");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllClaims = createAsyncThunk<TClaim[], undefined>(
  "/getAllClaims",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ClaimsService.findAll();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
