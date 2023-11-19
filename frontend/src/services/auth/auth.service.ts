import { axiosClassic, instance } from "@api/api.interceptor";
import {
  IAuthResponse,
  IRegisterResponse,
} from "@interfaces/data-interfaces/user.interface";
import { ACCESS_TOKEN, REFRESH_TOKEN, saveToStorage } from "@utils/tokens";
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

    if (response.data) saveToStorage(response.data);

    return response.data;
  },

  async register(data: RegisterType) {
    const response = await instance<IRegisterResponse>({
      url: `/auth/register`,
      method: "POST",
      data,
    });

    if (response.data)
      saveToStorage({
        refreshToken: response.data.refreshToken,
        accessToken: response.data.accessToken,
        user: { user: response.data.user },
      });

    return response.data;
  },

  async verifyAccount(token: string) {
    const response = await axiosClassic<IRegisterResponse>({
      url: `/auth/verify/${token}`,
      method: "POST",
    });

    if (response.data)
      saveToStorage({
        refreshToken: response.data.refreshToken,
        accessToken: response.data.accessToken,
        user: { user: response.data.user },
      });

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

  async resetWithToken(
    data: Pick<ResetUserPasswordType, "new_pass" | "resetToken">
  ) {
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

  async checkTokens() {
    const accessToken = Cookies.get(ACCESS_TOKEN);

    const response = await axiosClassic.post<boolean>("/auth/verify-token", {
      accessToken,
    });

    return response;
  },
};
