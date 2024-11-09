import { CLAIMS } from "@/const/startApi";
import { TClaim, TCreateClaim } from "@/types/TClaim";
import { instance } from "@api/api.interceptor";

export const ClaimsService = {
  async create(data: TCreateClaim) {
    return await instance<TCreateClaim>({
      url: `${CLAIMS}`,
      method: "POST",
      data,
    });
  },

  async findAll() {
    return await instance<TClaim[]>({
      url: `${CLAIMS}`,
      method: "GET",
    });
  },
};
