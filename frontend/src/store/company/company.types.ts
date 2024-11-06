import { TCompany, TCompanyInfo, TCompanyProduct } from "@/types/TCompany";
import { TCompanyStatistic } from "@/types/TCompanyStatistic";

export type TCompanyState = {
  statistic: TCompanyStatistic;
  isLoading: boolean;
  isDeleteLoading: boolean;
  isAddingLoading: boolean;
  isEditLoading: boolean;
  companies: TCompany[];
  companyProducts: TCompanyProduct[];
  tempData?: {
    email: string;
    password: string;
  };
  info: TCompanyInfo;
};
