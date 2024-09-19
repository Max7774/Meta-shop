import { TProfile } from "@/types/TProfile";
import { instance } from "@api/api.interceptor";

export const ProfileService = {
  async getUserProfile() {
    return await instance<TProfile>({
      url: "/users/profile",
      method: "GET",
    });
  },
};
