import { instance } from "@api/api.interceptor";
import { IProfileUserFromBackend } from "@interfaces/data-interfaces/user.interface";

export const UserService = {
  async getProfile() {
    const response = await instance<IProfileUserFromBackend>({
      url: "users/profile",
      method: "GET"
    });

    return response.data;
  },
};
