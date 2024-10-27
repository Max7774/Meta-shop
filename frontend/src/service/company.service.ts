import { TAddCompany } from "@/types/TAddCompany";
import { TCompanyStatistic } from "@/types/TCompanyStatistic";
import { instance } from "@api/api.interceptor";

export const CompanyService = {
  async getProductsStatistics() {
    return await instance<TCompanyStatistic>({
      url: "/company/statistic",
      method: "GET",
    });
  },

  async addCompany(data: TAddCompany) {
    return await instance<{ email: string; password: string }>({
      url: "/company",
      method: "POST",
      data,
    });
  },
};
