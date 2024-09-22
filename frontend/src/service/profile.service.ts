import { TAddress, TAddressForm } from "@/types/TAddress";
import { TProfile } from "@/types/TProfile";
import { instance } from "@api/api.interceptor";

export const ProfileService = {
  async getUserProfile() {
    return await instance<TProfile>({
      url: "/users/profile",
      method: "GET",
    });
  },

  async createAddress(data: TAddressForm) {
    return await instance<TAddress>({
      url: `/address`,
      method: "POST",
      data,
    });
  },

  async setCurrentAddress(addressUuid: string) {
    return await instance<string>({
      url: `/address/${addressUuid}`,
      method: "GET",
    });
  },
};
