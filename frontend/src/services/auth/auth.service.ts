import { axiosClassic, instance } from "@api/api.interceptor";
import { IAuthResponse } from "@interfaces/data-interfaces/user.interface";
import { REFRESH_TOKEN, saveToStorage } from "@utils/tokens";
import Cookies from "js-cookie";
import { LoginUserField, RegisterType } from "types/user.type";

export const AuthService = {
  async auth(data: LoginUserField | RegisterType, type: "login" | "register") {
    const response = await instance<IAuthResponse>({
      url: `/auth/${type}`,
      method: "POST",
      data,
    });

    if (response.data.accessToken) saveToStorage(response.data);

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(REFRESH_TOKEN);

    const response = await axiosClassic.post<string, { data: IAuthResponse }>(
      "/auth/login/access-token",
      { refreshToken }
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
