import { TCompanyProduct } from "@/types/TCompany";
import { TProduct } from "@/types/TProduct";

export type TProductState = {
  isLoading: boolean;
  isProductLoading: boolean;
  isProductRecovered: boolean;
  isSimilarLoading: boolean;
  products: TProduct[];
  similarProducts: TProduct[];
  length: number;
  product?: TProduct;
  selectedCompanyProduct: string;
  companyProducts: TCompanyProduct[];
};
