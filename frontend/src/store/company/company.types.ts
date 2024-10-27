import { TCompanyStatistic } from "@/types/TCompanyStatistic";

export type TCompanyState = {
  statistic: TCompanyStatistic;
  isLoading: boolean;
  tempData?: {
    email: string;
    password: string;
  };
};
