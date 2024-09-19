import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/const/tokens";
import { TAuthnResponse } from "@/types/TAuth";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get(ACCESS_TOKEN);
  return accessToken || null;
};

export const updateAccessToken = (accessToken: string) => {
  Cookies.set(ACCESS_TOKEN, accessToken);
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  return refreshToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const saveTokensStorage = (data: TAuthnResponse) => {
  Cookies.set(REFRESH_TOKEN, data.refreshToken);
  Cookies.set(ACCESS_TOKEN, data.accessToken);
};

export const removeFromStorage = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  localStorage.removeItem("user");
  window.location.reload();
};

export const saveToStorage = (data: TAuthnResponse) => {
  if (!data.user) {
    return;
  } else {
    saveTokensStorage(data);
    localStorage.setItem(
      "user",
      JSON.stringify({ email: data.user.email, uuid: data.user.uuid })
    );
  }
};
