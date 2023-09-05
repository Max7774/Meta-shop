import { errorCatch } from "@api/api.helper";
import { IAuthResponse } from "@interfaces/data-interfaces/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@services/auth/auth.service";
import { removeFromStorage } from "@utils/tokens";
import {
  LoginUserField,
  RegisterType,
  ResetUserPasswordType,
} from "types/user.type";

/* register */
export const register = createAsyncThunk<IAuthResponse, RegisterType>(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.auth(data, "register");

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* login */
export const login = createAsyncThunk<IAuthResponse, LoginUserField>(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.auth(data, "login");

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* reset password email */
export const resetPasswordEmail = createAsyncThunk<string, string>(
  "auth/reset-password",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.reset(data);

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* reset password */
export const resetPasswordToken = createAsyncThunk<
  unknown,
  ResetUserPasswordType
>("auth/reset-password", async (data, thunkApi) => {
  try {
    const response = await AuthService.resetWithToken(data);

    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error.response.data.message || "Unknown error"
    );
  }
});

/* logout */
export const logout = createAsyncThunk("/logout", async () => {
  window.location.href = "/auth";
  removeFromStorage();
});

/* checkAuth */
export const checkAuth = createAsyncThunk<
  IAuthResponse,
  {
    accessToken: string;
  }
>("auth/check-auth", async (_, thunkApi) => {
  try {
    const response = await AuthService.getNewTokens();

    return response.data;
  } catch (error) {
    if (errorCatch(error) === "jwt expired") {
      thunkApi.dispatch(logout());
    }

    return thunkApi.rejectWithValue(error);
  }
});
