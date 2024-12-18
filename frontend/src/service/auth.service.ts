import { AUTH, USERS } from "@/const/startApi";
import {
  TLogin,
  TAuthnResponse,
  TRegister,
  TResetPassword,
  TSignUp,
} from "@/types/TAuth";
import { TFilters } from "@/types/TFilters";
import { TAdminUser } from "@/types/TUser";
import { axiosClassic, instance } from "@api/api.interceptor";
import { ERoles } from "@enums/ERoles";
import { updateAccessToken } from "@utils/tokens";

export const AuthService = {
  async login(data: TLogin) {
    return await axiosClassic<TAuthnResponse>({
      url: `${AUTH}/login`,
      method: "POST",
      data,
    });
  },

  async register(data: TRegister) {
    return await axiosClassic<string>({
      url: `${AUTH}/register`,
      method: "POST",
      data,
    });
  },

  async phoneRegister(data: TSignUp) {
    return await axiosClassic<TAuthnResponse>({
      url: `${AUTH}/phone-register`,
      method: "POST",
      data,
    });
  },

  async verifyTokenFromRegister(token: string) {
    return await axiosClassic<TAuthnResponse>({
      url: `${AUTH}/verify/${token}`,
      method: "POST",
    });
  },

  async verifyAccessToken() {
    return await instance<ERoles>({
      url: `${AUTH}/verify-token`,
      method: "GET",
    });
  },

  async getNewAccessToken(refreshToken: string) {
    const { data } = await axiosClassic<TAuthnResponse>({
      url: `${AUTH}/login/access-token`,
      method: "POST",
      data: { refreshToken },
    });

    updateAccessToken(data.accessToken);

    return data;
  },

  async sendEmailToResetPassword(email: string) {
    return await axiosClassic<string>({
      url: `${AUTH}/reset-password`,
      method: "POST",
      data: { email },
    });
  },

  async resetPassword(data: TResetPassword) {
    return await axiosClassic<string>({
      url: `${AUTH}/reset`,
      method: "PATCH",
      data,
    });
  },

  async getAllUsers(data: TFilters) {
    return await instance<TAdminUser[]>({
      url: `${USERS}/all`,
      method: "GET",
      params: data,
    });
  },

  async deleteUser(uuid: string) {
    return await instance<TAdminUser>({
      url: `${USERS}/${uuid}`,
      method: "DELETE",
    });
  },
};
