import { TCompany } from "@/types/TCompany";
import { TCompanyStatistic } from "@/types/TCompanyStatistic";

export type TCompanyState = {
  statistic: TCompanyStatistic;
  isLoading: boolean;
  isDeleteLoading: boolean;
  isAddingLoading: boolean;
  companies: TCompany[];
  tempData?: {
    email: string;
    password: string;
  };
};
