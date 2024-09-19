import axios from "axios";

import { errorCatch, getContentType } from "./api.helper";
import {
  getAccessToken,
  getRefreshToken,
  removeFromStorage,
} from "@utils/tokens";
import { AuthService } from "@/service/auth.service";
import { BASE_URL } from "@/const/baseUrl";

const axiosOptions = {
  baseURL: BASE_URL,
  headers: getContentType("JSON"),
};

const axiosFileOptions = {
  baseURL: BASE_URL,
  headers: getContentType("FormData"),
};

export const axiosClassic = axios.create(axiosOptions);
export const formDataInstance = axios.create(axiosFileOptions);
export const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    console.log(error?.response);

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = getRefreshToken();
        await AuthService.getNewAccessToken(refreshToken || "");
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "Invalid refresh token") removeFromStorage();
      }
    }
    throw error;
  }
);

formDataInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config && config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

formDataInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    console.log(error?.response);

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = getRefreshToken();
        await AuthService.getNewAccessToken(refreshToken || "");
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "Invalid refresh token") removeFromStorage();
      }
    }
    throw error;
  }
);
