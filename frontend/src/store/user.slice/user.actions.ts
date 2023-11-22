import { errorCatch } from "@api/api.helper";
import {
  IAuthResponse,
  IRegisterResponse,
} from "@interfaces/data-interfaces/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@services/auth/auth.service";
import { removeFromStorage } from "@utils/tokens";
import { toast } from "react-toastify";
import {
  LoginUserField,
  RegisterType,
  ResetUserPasswordType,
} from "types/user.type";

/* register */
export const register = createAsyncThunk<IRegisterResponse, RegisterType>(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.register(data);

      return response;
    } catch (error: any) {
      toast.error(errorCatch(error), {
        position: toast.POSITION.TOP_CENTER,
      });
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* verify account */

export const verifyAccount = createAsyncThunk<IRegisterResponse, string>(
  "auth/verify-account",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.verifyAccount(data);

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
      toast.error(errorCatch(error), {
        position: toast.POSITION.TOP_CENTER,
      });
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
    const response = await AuthService.resetWithToken({
      new_pass: data.new_pass,
      resetToken: data.resetToken,
    });

    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error.response.data.message || "Unknown error"
    );
  }
});

/* logout */
export const logout = createAsyncThunk("/logout", async () => {
  removeFromStorage();
});

/* checkAuth */
export const checkAuth = createAsyncThunk<boolean>(
  "auth/check-auth",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.checkTokens();
      return response.data;
    } catch (error: any) {
      if (errorCatch(error) === "Invalid access token") {
        try {
          await AuthService.getNewTokens();
        } catch (error: any) {
          if (errorCatch(error) === "Invalid refresh token") {
            removeFromStorage();
          }
        }
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
