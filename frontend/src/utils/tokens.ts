import Cookies from "js-cookie";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const getAccessToken = () => {
  const accessToken = Cookies.get(ACCESS_TOKEN);
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const saveTokensStorage = (data: any) => {
  Cookies.set(REFRESH_TOKEN, data.refreshToken);
  Cookies.set(ACCESS_TOKEN, data.accessToken);
};

export const removeFromStorage = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  localStorage.removeItem("user");
};

export const saveToStorage = (data: any) => {
  if (!data.refreshToken) {
    return;
  } else {
    saveTokensStorage(data);
    localStorage.setItem("user", JSON.stringify({ access: data.accessToken }));
  }
};
