import { axiosClassic, instance } from "@api/api.interceptor";
import { IAuthResponse } from "@interfaces/data-interfaces/user.interface";
import { REFRESH_TOKEN, saveToStorage } from "@utils/tokens";
import Cookies from "js-cookie";
import {
  LoginUserField,
  RegisterType,
  ResetUserPasswordType,
} from "types/user.type";

export const AuthService = {
  async auth(data: LoginUserField | RegisterType, type: "login" | "register") {
    const response = await instance<IAuthResponse>({
      url: `/auth/${type}`,
      method: "POST",
      data,
    });

    console.log(response.data);

    if (response.data) saveToStorage(response.data);

    return response.data;
  },

  async reset(email: string) {
    const data = {
      email,
    };
    const response = await instance<string>({
      url: `/auth/reset-password`,
      method: "POST",
      data,
    });

    return response.data;
  },

  async resetWithToken(data: ResetUserPasswordType) {
    const response = await instance({
      url: `/auth/reset`,
      method: "PATCH",
      data,
    });

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(REFRESH_TOKEN);

    const response = await axiosClassic.post<string, { data: IAuthResponse }>(
      "/auth/login/access-token",
      { refreshToken }
    );

    if (response.data) saveToStorage(response.data);

    return response;
  },
};
