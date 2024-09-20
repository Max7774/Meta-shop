import { AuthService } from "@/service/auth.service";
import { ProfileService } from "@/service/profile.service";
import {
  TAuthnResponse,
  TLogin,
  TRegister,
  TResetPassword,
} from "@/types/TAuth";
import { TProfile } from "@/types/TProfile";
import { ERoles } from "@enums/ERoles";
import { RootState } from "@hooks/redux-hooks/reduxHooks";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeFromStorage, saveToStorage } from "@utils/tokens";
import { toast } from "react-toastify";

/* login */
export const login = createAsyncThunk<TAuthnResponse, TLogin>(
  "/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(data);

      saveToStorage(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);

      toast.error("Неправильный логин или пароль");
      return rejectWithValue({
        message: "Неправильный логин или пароль",
        status: 401,
      });
    }
  }
);

/* register */
export const register = createAsyncThunk<any, TRegister>(
  "/register",
  async (data, thunkApi) => {
    try {
      const { user } = thunkApi.getState() as RootState;

      if (user.registerCode === "none") {
        const response = await AuthService.register(data);
        toast.success("Вам выслан код подтверждения");

        return response.data;
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status) {
        toast.error("Такой пользователь уже существует");
      }

      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* phoneRegister */
export const phoneRegister = createAsyncThunk<
  TAuthnResponse,
  { phone_number: string }
>("/phoneRegister", async (data, thunkApi) => {
  try {
    const response = await AuthService.phoneRegister(data);

    saveToStorage(response.data);

    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response.status) {
      toast.error("Такой пользователь уже существует");
    }

    return thunkApi.rejectWithValue(
      error.response.data.message || "Unknown error"
    );
  }
});

/* verifyTokenFromRegister */
export const verifyTokenFromRegister = createAsyncThunk<any, string>(
  "/verifyTokenFromRegister",
  async (token, thunkApi) => {
    try {
      const response = await AuthService.verifyTokenFromRegister(token);

      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status) {
        toast.error("Ошибка авторизации");
      }

      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* sendEmailToResetPassword */
export const sendEmailToResetPassword = createAsyncThunk<any, string>(
  "/sendEmailToResetPassword",
  async (email, thunkApi) => {
    try {
      const response = await AuthService.sendEmailToResetPassword(email);

      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status) {
        toast.error("Такой пользователь уже существует");
      }

      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* resetPassword */
export const resetPassword = createAsyncThunk<any, TResetPassword>(
  "/resetPassword",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.resetPassword(data);

      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status) {
        toast.error("Такой пользователь уже существует");
      }

      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* verifyAccessToken */
export const verifyAccessToken = createAsyncThunk<ERoles, undefined>(
  "/token/verifyAccessToken",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.verifyAccessToken();

      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/* getNewAccessToken */
export const getNewAccessToken = createAsyncThunk<TAuthnResponse, string>(
  "/token/getNewAccessToken",
  async (refreshToken, thunkApi) => {
    try {
      const response = await AuthService.getNewAccessToken(refreshToken);

      return response;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/* logout */
export const logout = createAsyncThunk("/logout", async () => {
  removeFromStorage();
});

/* getUserProfile */
export const getUserProfile = createAsyncThunk<TProfile, undefined>(
  "/getUserProfile",
  async (_, thunkApi) => {
    try {
      const response = await ProfileService.getUserProfile();
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
