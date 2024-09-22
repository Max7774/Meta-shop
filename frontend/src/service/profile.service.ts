import { TAddress, TAddressForm } from "@/types/TAddress";
import { TProfile, TProfileEdit } from "@/types/TProfile";
import { formDataInstance, instance } from "@api/api.interceptor";

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

  async updateProfile(data: TProfileEdit) {
    return await instance<TProfile>({
      url: "/users/profile",
      method: "PUT",
      data,
    });
  },

  async setNewUserAvatar(image: File) {
    const formData = new FormData();
    formData.append("file", image);

    return await formDataInstance<string>({
      url: "/file-upload/update/user/avatar",
      method: "POST",
      data: formData,
    });
  },
};
