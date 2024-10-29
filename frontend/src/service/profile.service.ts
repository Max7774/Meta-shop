import { ADDRESS, FILE_UPLOAD, USERS } from "@/const/startApi";
import { TAddress, TAddressForm } from "@/types/TAddress";
import { TProfile, TProfileEdit } from "@/types/TProfile";
import { formDataInstance, instance } from "@api/api.interceptor";

export const ProfileService = {
  async getUserProfile() {
    return await instance<TProfile>({
      url: `${USERS}/profile`,
      method: "GET",
    });
  },

  async createAddress(data: TAddressForm) {
    return await instance<TAddress>({
      url: `${ADDRESS}`,
      method: "POST",
      data,
    });
  },

  async setCurrentAddress(addressUuid: string) {
    return await instance<string>({
      url: `${ADDRESS}/${addressUuid}`,
      method: "GET",
    });
  },

  async updateProfile(data: TProfileEdit) {
    return await instance<TProfile>({
      url: `${USERS}/profile`,
      method: "PUT",
      data,
    });
  },

  async setNewUserAvatar(image: File) {
    const formData = new FormData();
    formData.append("file", image);

    return await formDataInstance<string>({
      url: `${FILE_UPLOAD}/update/user/avatar`,
      method: "POST",
      data: formData,
    });
  },
};
