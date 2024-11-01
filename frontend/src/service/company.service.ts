import { COMPANY } from "@/const/startApi";
import { TAddCompany } from "@/types/TAddCompany";
import { TCompany } from "@/types/TCompany";
import { TCompanyStatistic } from "@/types/TCompanyStatistic";
import { instance } from "@api/api.interceptor";

export const CompanyService = {
  async getProductsStatistics() {
    return await instance<TCompanyStatistic>({
      url: `${COMPANY}/statistic`,
      method: "GET",
    });
  },

  async addCompany(data: TAddCompany) {
    return await instance<{ email: string; password: string }>({
      url: `${COMPANY}`,
      method: "POST",
      data,
    });
  },

  async getAllCompanies() {
    return await instance<TCompany[]>({
      url: `${COMPANY}`,
      method: "GET",
    });
  },

  async deleteCompany(uuid: string, userUuid: string) {
    return await instance<TCompany>({
      url: `${COMPANY}/${uuid}/${userUuid}`,
      method: "DELETE",
    });
  },
};
